# COSCUP 2025 GeoTrainPoly Backend

---

## 專案簡介



---

## Tech Stack

- Python 3.x
- FastAPI（後端 Web 框架）
- PostgreSQL（資料庫）
- uv (使用 uv 工具管理依賴與虛擬環境)
- 其他：python-dotenv, uvicorn

---

## 快速開始

### 1. 安裝並切換到虛擬環境

```bash
uv venv
source .venv/bin/activate
```

### 2. 安裝套件

```bash
uv pip install "fastapi[standard]"
```

或 讀取 requirements.txt 來安裝套件

```bash
uv install -r requirements.txt
```

### 3. 啟動 FastAPI
```bash
uvicorn app.main:app --reload
```
