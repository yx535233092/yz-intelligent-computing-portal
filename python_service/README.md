# Python Excel 解析服务

这是一个基于 FastAPI 和 Pandas 的微服务，专门用于处理复杂的 Excel 表格解析任务。

## 功能

-   接收 Excel 文件 (.xlsx, .xls) 上传。
-   使用 Pandas 强大的解析引擎读取数据。
-   返回 **Markdown 格式** 的表格字符串（可直接用于前端渲染）。
-   返回 **JSON 结构化数据**。

## 快速开始

### 1. 环境准备

建议使用 Python 3.8+。

创建并激活虚拟环境（可选但推荐）：

```bash
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate  # Windows
```

### 2. 安装依赖

```bash
pip install -r requirements.txt
```

### 3. 运行服务

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 29000
```

服务将在 `http://localhost:29000` 启动。

### 4. API 接口

*   **POST** `/parse/excel`
    *   Body: `form-data`, key: `file`, type: `File`
    *   Response:
        ```json
        {
            "success": true,
            "md_format": "| Header1 | Header2 |...\n|---|---|...",
            "json_data": [...],
            "headers": [...],
            "info": { "rows": 10, ... }
        }
        ```

