-- 密码表（只存一条记录）
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- 插入默认密码（123456 的哈希值）
INSERT OR IGNORE INTO settings (key, value) VALUES ('password', '123456');