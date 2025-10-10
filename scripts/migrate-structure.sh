#!/bin/bash

# 目录结构迁移脚本
# 用法: ./scripts/migrate-structure.sh [阶段编号]
# 示例: ./scripts/migrate-structure.sh 1  # 只执行阶段1

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 辅助函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

confirm() {
    read -p "$(echo -e ${YELLOW}$1${NC} [y/N]: )" response
    case "$response" in
        [yY][eE][sS]|[yY]) 
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

# 检查是否在项目根目录
check_project_root() {
    if [ ! -f "package.json" ] || [ ! -f "next.config.ts" ]; then
        log_error "请在项目根目录下运行此脚本"
        exit 1
    fi
}

# 创建备份
create_backup() {
    log_info "创建备份..."
    
    BACKUP_BRANCH="backup/before-restructure-$(date +%Y%m%d-%H%M%S)"
    
    # 检查是否有未提交的更改
    if ! git diff-index --quiet HEAD --; then
        log_warning "检测到未提交的更改"
        if confirm "是否要先提交这些更改？"; then
            git add -A
            git commit -m "chore: save changes before restructure"
        fi
    fi
    
    # 创建备份分支
    git checkout -b "$BACKUP_BRANCH" 2>/dev/null || {
        log_error "创建备份分支失败"
        exit 1
    }
    
    git checkout - > /dev/null
    
    log_success "备份分支已创建: $BACKUP_BRANCH"
}

# 阶段 1: Public 目录重构
migrate_public() {
    log_info "========================================"
    log_info "阶段 1: Public 目录重构"
    log_info "========================================"
    
    if ! confirm "开始执行 Public 目录重构？"; then
        log_warning "跳过阶段 1"
        return
    fi
    
    # 创建新目录结构
    log_info "创建新的目录结构..."
    mkdir -p public/assets/{images/{logos,icons,cases,services,banners},videos,audio,documents/samples}
    mkdir -p public/workers
    
    # 移动 Logo
    log_info "移动 Logo 文件..."
    [ -f "public/h3c-logo.webp" ] && mv public/h3c-logo.webp public/assets/images/logos/
    [ -f "public/h3c-logo.png" ] && mv public/h3c-logo.png public/assets/images/logos/
    [ -f "public/logo.webp" ] && mv public/logo.webp public/assets/images/logos/
    [ -f "public/logo.png" ] && mv public/logo.png public/assets/images/logos/
    
    # 移动图标
    log_info "移动图标文件..."
    for icon in empty.svg file.svg globe.svg window.svg next.svg vercel.svg; do
        [ -f "public/$icon" ] && mv "public/$icon" public/assets/images/icons/
    done
    
    # 移动服务配图
    log_info "移动服务配图..."
    for img in data-service.jpg chat.webp data{1..6}.png 数据集成.webp 智能问答.webp; do
        [ -f "public/$img" ] && mv "public/$img" public/assets/images/services/ 2>/dev/null || true
    done
    
    # 移动轮播图
    log_info "移动轮播图..."
    for banner in {10..13}.webp; do
        [ -f "public/$banner" ] && mv "public/$banner" public/assets/images/banners/ 2>/dev/null || true
    done
    
    # 移动案例图片
    log_info "移动案例图片..."
    mkdir -p public/assets/images/cases/{education,enterprise,government,operator}
    
    # 教育行业
    find public -maxdepth 1 -name "教育*.webp" -exec mv {} public/assets/images/cases/education/ \; 2>/dev/null || true
    find public -maxdepth 1 -name "*高职校*.webp" -exec mv {} public/assets/images/cases/education/ \; 2>/dev/null || true
    
    # 政府行业
    find public -maxdepth 1 -name "某市*.webp" -exec mv {} public/assets/images/cases/government/ \; 2>/dev/null || true
    find public -maxdepth 1 -name "某省*.webp" -exec mv {} public/assets/images/cases/government/ \; 2>/dev/null || true
    find public -maxdepth 1 -name "*公安*.webp" -exec mv {} public/assets/images/cases/government/ \; 2>/dev/null || true
    find public -maxdepth 1 -name "*应急*.webp" -exec mv {} public/assets/images/cases/government/ \; 2>/dev/null || true
    find public -maxdepth 1 -name "*营商*.webp" -exec mv {} public/assets/images/cases/government/ \; 2>/dev/null || true
    find public -maxdepth 1 -name "江苏*.webp" -exec mv {} public/assets/images/cases/government/ \; 2>/dev/null || true
    find public -maxdepth 1 -name "浙江*.webp" -exec mv {} public/assets/images/cases/government/ \; 2>/dev/null || true
    
    # 企业行业
    find public -maxdepth 1 -name "某集团*.webp" -exec mv {} public/assets/images/cases/enterprise/ \; 2>/dev/null || true
    find public -maxdepth 1 -name "某石油*.webp" -exec mv {} public/assets/images/cases/enterprise/ \; 2>/dev/null || true
    find public -maxdepth 1 -name "*企业*.webp" -exec mv {} public/assets/images/cases/enterprise/ \; 2>/dev/null || true
    
    # 运营商行业
    find public -maxdepth 1 -name "云南*.webp" -exec mv {} public/assets/images/cases/operator/ \; 2>/dev/null || true
    find public -maxdepth 1 -name "山东*.webp" -exec mv {} public/assets/images/cases/operator/ \; 2>/dev/null || true
    find public -maxdepth 1 -name "*运营商*.webp" -exec mv {} public/assets/images/cases/operator/ \; 2>/dev/null || true
    find public -maxdepth 1 -name "电信*.webp" -exec mv {} public/assets/images/cases/operator/ \; 2>/dev/null || true
    
    # 移动媒体文件
    log_info "移动媒体文件..."
    find public -maxdepth 1 \( -name "*.mov" -o -name "*.mp4" \) -exec mv {} public/assets/videos/ \; 2>/dev/null || true
    find public -maxdepth 1 -name "*.wav" -exec mv {} public/assets/audio/ \; 2>/dev/null || true
    find public -maxdepth 1 -name "*.gif" -exec mv {} public/assets/images/ \; 2>/dev/null || true
    
    # 移动 Worker 文件
    log_info "移动 Worker 文件..."
    [ -f "public/5.4.54pdf.worker.min.mjs" ] && mv public/5.4.54pdf.worker.min.mjs public/workers/pdf.worker.min.mjs
    
    # 更新代码中的图片引用
    log_info "更新代码中的图片引用..."
    if command -v gsed &> /dev/null; then
        SED_CMD="gsed"
    else
        SED_CMD="sed"
    fi
    
    # 根据操作系统选择 sed 参数
    if [[ "$OSTYPE" == "darwin"* ]]; then
        SED_INPLACE="-i ''"
    else
        SED_INPLACE="-i"
    fi
    
    find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec $SED_CMD $SED_INPLACE \
        -e 's|"/h3c-logo\.webp"|"/assets/images/logos/h3c-logo.webp"|g' \
        -e 's|"/logo\.webp"|"/assets/images/logos/logo.webp"|g' \
        -e 's|"/chat\.webp"|"/assets/images/services/chat.webp"|g' \
        {} + 2>/dev/null || log_warning "sed 替换失败，请手动更新图片路径"
    
    # 提交更改
    git add public/ src/
    git commit -m "refactor: reorganize public directory structure" || log_warning "没有变更需要提交"
    
    log_success "阶段 1 完成！"
}

# 阶段 2: API 层重构
migrate_api() {
    log_info "========================================"
    log_info "阶段 2: API 层重构"
    log_info "========================================"
    
    if ! confirm "开始执行 API 层重构？"; then
        log_warning "跳过阶段 2"
        return
    fi
    
    # 检查 src/apis 目录是否存在
    if [ ! -d "src/apis" ]; then
        log_warning "src/apis 目录不存在，跳过此阶段"
        return
    fi
    
    # 创建新目录
    log_info "创建新的 API 目录结构..."
    mkdir -p src/lib/api/{client,server}
    mkdir -p src/lib/api/client/{data-processing,external}
    
    # 移动文件
    log_info "移动 API 文件..."
    [ -f "src/apis/applications.ts" ] && mv src/apis/applications.ts src/lib/api/client/
    [ -f "src/apis/chemicalParse.ts" ] && mv src/apis/chemicalParse.ts src/lib/api/client/chemical.ts
    [ -f "src/apis/login.ts" ] && mv src/apis/login.ts src/lib/api/client/auth.ts
    
    # 移动数据处理相关
    if [ -d "src/apis/data-process" ]; then
        cp -r src/apis/data-process/* src/lib/api/client/data-processing/ 2>/dev/null || true
    fi
    
    # 移动外部 API
    [ -f "src/apis/service-app/hj.ts" ] && mv src/apis/service-app/hj.ts src/lib/api/client/external/hj-platform.ts
    
    # 移动服务端 API
    [ -f "src/lib/api/prisma.ts" ] && mv src/lib/api/prisma.ts src/lib/api/server/
    
    # 创建统一导出
    log_info "创建 API 导出文件..."
    cat > src/lib/api/client/index.ts << 'EOF'
export * from './auth';
export * from './applications';
export * from './chemical';
export * as dataProcessing from './data-processing';
export * as external from './external';
EOF
    
    # 删除旧目录（需要确认）
    if confirm "是否删除旧的 src/apis 目录？"; then
        rm -rf src/apis/
        log_success "已删除旧目录"
    else
        log_warning "保留了旧目录，请手动删除"
    fi
    
    # 提交更改
    git add src/lib/api src/apis 2>/dev/null || true
    git commit -m "refactor: restructure API layer with client/server separation" || log_warning "没有变更需要提交"
    
    log_success "阶段 2 完成！"
    log_warning "注意：需要手动更新代码中的 API 导入路径"
}

# 阶段 3: 组件结构优化
migrate_components() {
    log_info "========================================"
    log_info "阶段 3: 组件结构优化"
    log_info "========================================"
    
    if ! confirm "开始执行组件结构优化？"; then
        log_warning "跳过阶段 3"
        return
    fi
    
    # 创建新目录
    log_info "创建新的组件目录结构..."
    mkdir -p src/components/{ui,common,features,layouts}
    mkdir -p src/components/features/{auth,data-processing,chemical,cases,navigation}
    
    # 移动布局组件
    log_info "移动布局组件..."
    [ -d "src/components/layout/layout-auth" ] && mv src/components/layout/layout-auth src/components/layouts/AuthLayout
    [ -d "src/components/layout/layout-portal" ] && mv src/components/layout/layout-portal src/components/layouts/PortalLayout
    [ -d "src/components/layout/layout-manage" ] && mv src/components/layout/layout-manage src/components/layouts/AdminLayout
    
    # 移动数据处理组件
    if [ -d "src/components/data-process" ]; then
        log_info "移动数据处理组件..."
        cp -r src/components/data-process/* src/components/features/data-processing/ 2>/dev/null || true
    fi
    
    # 移动其他功能组件
    [ -d "src/components/features/nav" ] && mv src/components/features/nav src/components/features/navigation
    
    # 创建组件索引文件
    log_info "创建组件导出文件..."
    
    # UI 组件导出
    cat > src/components/ui/index.ts << 'EOF'
export { RouteButton } from './RouteButton';
EOF
    
    # Common 组件导出
    cat > src/components/common/index.ts << 'EOF'
export { Logo } from './Logo';
export { FilePreview } from './FilePreview';
EOF
    
    # Layouts 导出
    cat > src/components/layouts/index.ts << 'EOF'
export * from './AuthLayout';
export * from './PortalLayout';
export * from './AdminLayout';
EOF
    
    # 删除旧目录（需要确认）
    if confirm "是否删除旧的组件目录？"; then
        [ -d "src/components/layout" ] && rm -rf src/components/layout/
        [ -d "src/components/data-process" ] && rm -rf src/components/data-process/
        log_success "已删除旧目录"
    else
        log_warning "保留了旧目录，请手动删除"
    fi
    
    # 提交更改
    git add src/components
    git commit -m "refactor: reorganize component architecture" || log_warning "没有变更需要提交"
    
    log_success "阶段 3 完成！"
    log_warning "注意：需要手动更新代码中的组件导入路径"
}

# 阶段 4: 类型定义优化
migrate_types() {
    log_info "========================================"
    log_info "阶段 4: 类型定义优化"
    log_info "========================================"
    
    if ! confirm "开始执行类型定义优化？"; then
        log_warning "跳过阶段 4"
        return
    fi
    
    # 创建通用类型文件
    log_info "创建通用类型文件..."
    
    cat > src/types/common.ts << 'EOF'
/**
 * 通用 API 响应类型
 */
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

/**
 * 分页参数
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * 分页响应
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 加载状态
 */
export type LoadingState = 'idle' | 'pending' | 'success' | 'error';

/**
 * 选项类型
 */
export interface SelectOption<T = string> {
  label: string;
  value: T;
}
EOF
    
    # 创建 API 类型文件
    cat > src/types/api.ts << 'EOF'
/**
 * API 错误类型
 */
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

/**
 * HTTP 方法
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * 请求配置
 */
export interface RequestConfig {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
}
EOF
    
    # 重命名目录
    [ -d "src/types/data-process" ] && mv src/types/data-process src/types/data-processing
    [ -d "src/types/profile" ] && mv src/types/profile src/types/user
    
    # 合并 manage 类型
    if [ -d "src/types/manage" ]; then
        cat src/types/manage/*.ts >> src/types/user/index.ts 2>/dev/null || true
        rm -rf src/types/manage
    fi
    
    # 创建统一导出
    log_info "创建类型统一导出..."
    cat > src/types/index.ts << 'EOF'
export * from './common';
export * from './api';
export * from './auth';
export * from './application';
export * from './data-processing';
export * from './chemical';
export * from './excel';
export * from './user';
EOF
    
    # 提交更改
    git add src/types
    git commit -m "refactor: optimize type definitions structure" || log_warning "没有变更需要提交"
    
    log_success "阶段 4 完成！"
}

# 显示使用帮助
show_help() {
    cat << EOF
目录结构迁移脚本

用法:
  $0 [选项] [阶段编号]

选项:
  -h, --help     显示此帮助信息
  -a, --all      执行所有迁移阶段
  --no-backup    跳过备份步骤（不推荐）

阶段:
  1  Public 目录重构
  2  API 层重构
  3  组件结构优化
  4  类型定义优化

示例:
  $0 1           # 只执行阶段 1
  $0 -a          # 执行所有阶段
  $0 --no-backup 1  # 跳过备份，执行阶段 1

注意:
  - 建议在执行前先提交所有未保存的更改
  - 每个阶段执行完会自动提交 Git
  - 可以多次运行脚本，已完成的操作会被跳过
EOF
}

# 主函数
main() {
    local SKIP_BACKUP=false
    local EXECUTE_ALL=false
    local STAGE=""
    
    # 解析参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -a|--all)
                EXECUTE_ALL=true
                shift
                ;;
            --no-backup)
                SKIP_BACKUP=true
                shift
                ;;
            [1-4])
                STAGE=$1
                shift
                ;;
            *)
                log_error "未知参数: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # 检查项目根目录
    check_project_root
    
    log_info "========================================="
    log_info "  H3C 智算服务平台 - 目录结构迁移工具"
    log_info "========================================="
    echo ""
    
    # 创建备份
    if [ "$SKIP_BACKUP" = false ]; then
        if confirm "是否创建 Git 备份分支？"; then
            create_backup
        fi
    fi
    
    echo ""
    
    # 执行迁移
    if [ "$EXECUTE_ALL" = true ]; then
        migrate_public
        migrate_api
        migrate_components
        migrate_types
    elif [ -n "$STAGE" ]; then
        case $STAGE in
            1) migrate_public ;;
            2) migrate_api ;;
            3) migrate_components ;;
            4) migrate_types ;;
        esac
    else
        log_info "请选择要执行的迁移阶段:"
        echo "  1. Public 目录重构"
        echo "  2. API 层重构"
        echo "  3. 组件结构优化"
        echo "  4. 类型定义优化"
        echo "  a. 执行所有阶段"
        echo "  q. 退出"
        echo ""
        read -p "请输入选项: " choice
        
        case $choice in
            1) migrate_public ;;
            2) migrate_api ;;
            3) migrate_components ;;
            4) migrate_types ;;
            a|A) 
                migrate_public
                migrate_api
                migrate_components
                migrate_types
                ;;
            q|Q) 
                log_info "已取消操作"
                exit 0
                ;;
            *)
                log_error "无效的选项"
                exit 1
                ;;
        esac
    fi
    
    echo ""
    log_success "========================================="
    log_success "  迁移完成！"
    log_success "========================================="
    echo ""
    log_warning "后续步骤："
    echo "  1. 运行 'npm run dev' 检查应用是否正常"
    echo "  2. 手动更新代码中的导入路径"
    echo "  3. 运行 'npm run lint' 检查代码规范"
    echo "  4. 运行 'npm run build' 确保构建成功"
    echo ""
}

# 运行主函数
main "$@"

