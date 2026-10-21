import sqlite3

DB_FILE = "history.db"

def get_conn():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row      # 让查询结果带上列名（默认是元组）
    return conn

def init_db():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT,
        score REAL,
        label TEXT,
        pinyin TEXT,
        created_at TEXT
    )
    """)
    conn.commit()
    conn.close()

def save_record(record):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO history (text, score, label, pinyin, created_at) VALUES (?, ?, ?, ?, ?)",
        [record["text"], record["score"], record["label"], record["pinyin"], record["created_at"]],
    )
    conn.commit()
    conn.close()


def get_history(limit):
    conn = get_conn()  # 打开数据库连接
    cur = conn.cursor()  # 创建游标，用于执行 SQL
    rows = cur.execute(
        "SELECT * FROM history ORDER BY created_at DESC LIMIT ?",  # 查询记录，并按创建时间倒序排列
        [limit],  # 将 limit 作为参数传入，限制返回记录数
    ).fetchall()  # 执行查询并取回所有结果行
    conn.close()  # 查询完成后关闭数据库连接

    records = []  # 创建列表，用于存放转换后的记录
    for row in rows:
        records.append(dict(row))  # 将 sqlite3.Row 转换为普通字典并加入列表
    return records  # 返回记录列表