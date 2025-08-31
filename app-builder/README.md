# App Builder Module

应用构建模块，提供完整的应用创建功能，从服务市场中独立出来。

## 🏗️ 架构设计

```
app-builder/
├── src/
│   ├── components/          # React 组件
│   │   └── modals/          # 模态框组件
│   │       ├── CreateAppModal.tsx             # 基础应用创建模态框
│   │       └── CreateAppModalAdvanced.tsx     # 高级应用创建模态框（使用Hook）
│   ├── hooks/               # 自定义 React Hooks
│   │   └── useAppBuilder.ts # 应用构建逻辑 Hook
│   ├── types/               # TypeScript 类型定义
│   │   └── app.ts           # 应用相关类型
│   ├── utils/               # 工具函数
│   │   └── appUtils.ts      # 应用处理工具函数
│   └── index.ts             # 模块入口文件
└── README.md
```

## 🚀 功能特性

### 组件功能
- ✅ **双模态框选择**：基础版本和高级版本（使用自定义Hook）
- ✅ **应用类型选择**：对话式应用 vs 交互式应用
- ✅ **构建方式选择**：Prompt驱动、功能编排、工作流引擎
- ✅ **表单验证**：实时验证和错误提示
- ✅ **文件上传**：应用图标上传功能
- ✅ **实时预览**：右侧手机界面预览
- ✅ **步骤控制**：多步骤创建流程

### 技术特性
- 🎯 **TypeScript 支持**：完整的类型定义
- 🎨 **Tailwind CSS**：响应式设计和现代UI
- 🔧 **自定义 Hooks**：可复用的状态管理逻辑
- 📱 **移动端适配**：完整的响应式设计
- ⚡ **性能优化**：使用 useCallback 优化重渲染

## 📖 使用方法

### 基础用法

```tsx
import { CreateAppModal } from '@/app-builder';

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        创建应用
      </button>
      
      <CreateAppModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
```

### 高级用法（使用回调）

```tsx
import { CreateAppModalAdvanced, AppData } from '@/app-builder';

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAppCreated = (appData: AppData) => {
    console.log('应用创建成功:', appData);
    // 处理创建成功的逻辑
  };

  return (
    <CreateAppModalAdvanced 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSuccess={handleAppCreated}
    />
  );
}
```

### 使用自定义 Hook

```tsx
import { useAppBuilder } from '@/app-builder';

function CustomAppBuilder() {
  const {
    appName,
    appType,
    buildMethod,
    setAppName,
    setAppType,
    setBuildMethod,
    handleCreate,
    handleCancel,
    isLoading,
    errors
  } = useAppBuilder();

  return (
    <div>
      {/* 自定义UI组件 */}
      <input 
        value={appName}
        onChange={(e) => setAppName(e.target.value)}
        placeholder="应用名称"
      />
      
      <button onClick={handleCreate} disabled={isLoading}>
        {isLoading ? '创建中...' : '创建应用'}
      </button>
      
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map(error => <div key={error}>{error}</div>)}
        </div>
      )}
    </div>
  );
}
```

## 🔧 API 参考

### CreateAppModalProps

```typescript
interface CreateAppModalProps {
  isOpen: boolean;                    // 模态框是否打开
  onClose: () => void;                // 关闭回调
  onSuccess?: (app: AppData) => void; // 创建成功回调
}
```

### AppData

```typescript
interface AppData {
  id?: string;           // 应用ID
  name: string;          // 应用名称
  type: AppType;         // 应用类型
  buildMethod: BuildMethod; // 构建方式
  description?: string;  // 应用描述
  icon?: File | string;  // 应用图标
  industry?: string;     // 所属行业
  createdAt: string;     // 创建时间
  updatedAt?: string;    // 更新时间
}
```

### useAppBuilder Hook

返回应用构建的完整状态和操作方法：

```typescript
const {
  // 状态
  currentStep,      // 当前步骤
  appType,          // 应用类型
  buildMethod,      // 构建方式
  appName,          // 应用名称
  appDescription,   // 应用描述
  appIcon,          // 应用图标
  industry,         // 所属行业
  isLoading,        // 加载状态
  errors,           // 错误信息
  
  // 操作方法
  setAppType,       // 设置应用类型
  setBuildMethod,   // 设置构建方式
  setAppName,       // 设置应用名称
  setAppDescription,// 设置应用描述
  setAppIcon,       // 设置应用图标
  setIndustry,      // 设置所属行业
  handleNext,       // 下一步
  handleBack,       // 上一步
  handleCreate,     // 创建应用
  handleCancel,     // 取消创建
  resetForm         // 重置表单
} = useAppBuilder();
```

## 🎨 UI 设计

- **布局**：双栏布局，左侧表单，右侧预览
- **尺寸**：max-w-5xl 宽度，80vh 高度
- **响应式**：完整的移动端适配
- **主题**：现代化设计，支持深色模式
- **动画**：平滑的过渡动画和加载状态

## 🚧 待开发功能

- [ ] 应用模板系统
- [ ] 批量应用创建
- [ ] 应用配置导入/导出
- [ ] 应用创建历史记录
- [ ] 高级表单验证规则
- [ ] 国际化支持

## 🔄 与主项目集成

该模块设计为独立的功能模块，可以通过以下方式集成到主项目中：

1. **相对路径导入**：`import { CreateAppModal } from '../app-builder'`
2. **共享组件**：可以复用 service-market 的 UI 组件
3. **状态管理**：可以与主项目的状态管理系统集成
4. **路由集成**：可以作为路由组件使用

## 📝 更新日志

### v1.0.0 (2025-09-01)
- ✅ 初始版本发布
- ✅ 基础组件和高级组件
- ✅ 完整的 TypeScript 支持
- ✅ 自定义 Hook 实现
- ✅ 工具函数和类型定义
- ✅ 完整的文档
