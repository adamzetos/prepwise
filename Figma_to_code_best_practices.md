# Figma to Code Best Practices
**Based on PrepWise Development Experience**

## Table of Contents
- [English Version](#english-version)
- [中文版本](#chinese-version)

---

# English Version

## 1. Pre-Development Preparation

### 1.1 Design Analysis
- **Thoroughly examine the entire Figma design** before writing any code
- **Create a component inventory** listing all unique elements
- **Identify reusable patterns** across different pages
- **Note exact colors, spacing, and typography** from design specs
- **Map out the navigation flow** between pages

### 1.2 Asset Preparation
- **Export all assets BEFORE coding begins**
- **Ensure consistent naming convention** (use underscores, not spaces)
- **Organize assets logically**:
  ```
  /public/
  ├── images/          # Large images, photos
  ├── icons/           # SVG icons
  └── logos/           # Brand assets
  ```
- **Verify all exported assets** are accessible and correctly named
- **Check image formats**: Use SVG for icons, PNG/JPG for photos

### 1.3 Project Setup
- **Establish coding standards** upfront (inline styles vs CSS)
- **Create component structure** before implementation
- **Set up routing architecture** based on navigation flow
- **Define color and typography constants** from design system

## 2. Component Development Process

### 2.1 Development Order
1. **Navigation components first** - they appear on every page
2. **Shared components next** - footer, buttons, forms
3. **Page-specific components** - unique to each page
4. **Complex features last** - animations, charts, interactions

### 2.2 Component Structure
```typescript
/**
 * Project: [Name]
 * Component: [ComponentName]
 * Purpose: [What it does]
 * Why Needed: [Business value]
 */

export function ComponentName() {
  // State management
  // Event handlers
  // Styles as const objects
  // Render logic
}
```

### 2.3 Style Management
- **Use exact values from Figma** - never approximate
- **Create reusable style objects** for common patterns
- **Maintain consistency** across similar elements
- **Include all states**: default, hover, active, disabled

## 3. Quality Assurance

### 3.1 Continuous Testing
- **Test each component immediately** after creation
- **Verify against Figma** at every step
- **Check all interactive states** (hover, click, focus)
- **Ensure responsive behavior** works as expected
- **Test navigation flow** between pages

### 3.2 Common Issues Prevention
| Issue | Prevention Strategy |
|-------|-------------------|
| Broken layouts | Use proper flex/grid properties |
| Missing assets | Verify paths start with `/` |
| Wrong colors | Copy exact hex values from Figma |
| Spacing issues | Use precise pixel values |
| White icons invisible | Add backgrounds or filters |

### 3.3 Asset Verification
- **Check console for 404 errors** regularly
- **Verify image loading** in different browsers
- **Test with slow network** conditions
- **Ensure alt text** for accessibility

## 4. Workflow Optimization

### 4.1 Communication Patterns
- **Provide specific asset paths** in requirements
- **Include exact text content** from designs
- **Describe interactions clearly** with examples
- **Give incremental feedback** for iterations

### 4.2 Efficient Development
- **Build one feature completely** before moving to next
- **Reuse components aggressively** to save time
- **Create consistent patterns** for similar elements
- **Document decisions** as you make them

### 4.3 Problem Resolution
- **Fix issues immediately** when discovered
- **Don't accumulate technical debt**
- **Ask for clarification** rather than guessing
- **Keep console error-free** at all times

## 5. Best Practices Summary

### DO's ✅
1. **Plan before coding** - analyze all designs first
2. **Export assets early** - never use placeholders
3. **Match exactly** - use precise Figma values
4. **Test continuously** - verify each component
5. **Communicate clearly** - provide specific requirements
6. **Reuse components** - maximize code efficiency
7. **Handle all states** - hover, active, disabled
8. **Document patterns** - for team consistency

### DON'Ts ❌
1. **Don't start without assets** - always export first
2. **Don't approximate values** - use exact measurements
3. **Don't skip testing** - verify everything works
4. **Don't use spaces in filenames** - use underscores
5. **Don't ignore console errors** - fix immediately
6. **Don't guess requirements** - ask for clarification
7. **Don't hardcode repeated values** - use constants
8. **Don't rush quality** - accuracy over speed

## 6. Advanced Techniques

### 6.1 Animation Implementation
- **Use React hooks** for state-based animations
- **Implement with requestAnimationFrame** for smoothness
- **Add transitions** for property changes
- **Test performance** on slower devices

### 6.2 Complex Components
- **Break into smaller parts** for maintainability
- **Use proper TypeScript types** for props
- **Implement error boundaries** for robustness
- **Add loading states** for async operations

### 6.3 Performance Optimization
- **Lazy load large images** when possible
- **Optimize SVGs** by removing unnecessary code
- **Use React.memo** for expensive components
- **Monitor bundle size** regularly

---

# Chinese Version
# 中文版本

## 1. 开发前准备

### 1.1 设计分析
- **在编写任何代码之前彻底检查整个 Figma 设计**
- **创建组件清单**，列出所有独特元素
- **识别不同页面间的可重用模式**
- **记录设计规范中的准确颜色、间距和字体**
- **绘制页面间的导航流程图**

### 1.2 资源准备
- **在开始编码前导出所有资源**
- **确保一致的命名规范**（使用下划线，不用空格）
- **逻辑地组织资源**：
  ```
  /public/
  ├── images/          # 大图片、照片
  ├── icons/           # SVG 图标
  └── logos/           # 品牌资源
  ```
- **验证所有导出的资源**可访问且命名正确
- **检查图片格式**：图标用 SVG，照片用 PNG/JPG

### 1.3 项目设置
- **预先建立编码标准**（内联样式 vs CSS）
- **在实现前创建组件结构**
- **基于导航流程设置路由架构**
- **从设计系统定义颜色和字体常量**

## 2. 组件开发流程

### 2.1 开发顺序
1. **首先开发导航组件** - 它们出现在每个页面
2. **接着开发共享组件** - 页脚、按钮、表单
3. **然后开发页面特定组件** - 每个页面独有的
4. **最后开发复杂功能** - 动画、图表、交互

### 2.2 组件结构
```typescript
/**
 * 项目：[名称]
 * 组件：[组件名称]
 * 用途：[做什么]
 * 必要性：[业务价值]
 */

export function ComponentName() {
  // 状态管理
  // 事件处理
  // 样式作为常量对象
  // 渲染逻辑
}
```

### 2.3 样式管理
- **使用 Figma 中的精确值** - 永不近似
- **为常见模式创建可重用的样式对象**
- **保持相似元素的一致性**
- **包含所有状态**：默认、悬停、激活、禁用

## 3. 质量保证

### 3.1 持续测试
- **创建后立即测试每个组件**
- **每一步都与 Figma 验证**
- **检查所有交互状态**（悬停、点击、聚焦）
- **确保响应式行为**按预期工作
- **测试页面间的导航流程**

### 3.2 常见问题预防
| 问题 | 预防策略 |
|------|---------|
| 布局损坏 | 使用正确的 flex/grid 属性 |
| 资源缺失 | 验证路径以 `/` 开头 |
| 颜色错误 | 从 Figma 复制精确的十六进制值 |
| 间距问题 | 使用精确的像素值 |
| 白色图标不可见 | 添加背景或滤镜 |

### 3.3 资源验证
- **定期检查控制台的 404 错误**
- **在不同浏览器中验证图片加载**
- **在慢速网络条件下测试**
- **确保无障碍的替代文本**

## 4. 工作流程优化

### 4.1 沟通模式
- **在需求中提供具体的资源路径**
- **包含设计中的准确文本内容**
- **用示例清晰描述交互**
- **为迭代提供增量反馈**

### 4.2 高效开发
- **完整构建一个功能**后再进行下一个
- **积极重用组件**以节省时间
- **为相似元素创建一致的模式**
- **边做边记录决策**

### 4.3 问题解决
- **发现问题立即修复**
- **不要积累技术债务**
- **询问澄清**而不是猜测
- **始终保持控制台无错误**

## 5. 最佳实践总结

### 应该做的 ✅
1. **编码前计划** - 首先分析所有设计
2. **尽早导出资源** - 永不使用占位符
3. **精确匹配** - 使用精确的 Figma 值
4. **持续测试** - 验证每个组件
5. **清晰沟通** - 提供具体需求
6. **重用组件** - 最大化代码效率
7. **处理所有状态** - 悬停、激活、禁用
8. **记录模式** - 保持团队一致性

### 不应该做的 ❌
1. **不要在没有资源的情况下开始** - 始终先导出
2. **不要近似值** - 使用精确测量
3. **不要跳过测试** - 验证一切正常
4. **不要在文件名中使用空格** - 使用下划线
5. **不要忽略控制台错误** - 立即修复
6. **不要猜测需求** - 请求澄清
7. **不要硬编码重复值** - 使用常量
8. **不要牺牲质量求快** - 准确性优于速度

## 6. 高级技巧

### 6.1 动画实现
- **使用 React hooks** 进行基于状态的动画
- **使用 requestAnimationFrame** 实现平滑度
- **为属性变化添加过渡**
- **在较慢设备上测试性能**

### 6.2 复杂组件
- **分解成更小的部分**以提高可维护性
- **为 props 使用正确的 TypeScript 类型**
- **实现错误边界**以提高健壮性
- **为异步操作添加加载状态**

### 6.3 性能优化
- **尽可能延迟加载大图片**
- **通过删除不必要的代码优化 SVG**
- **对昂贵的组件使用 React.memo**
- **定期监控包大小**

---

**结语**: 这些最佳实践来自于 PrepWise 项目的实际开发经验。遵循这些准则，您可以高效地将 Figma 设计转换为高质量的生产就绪代码。记住：准确性和质量始终比速度更重要。

**Conclusion**: These best practices come from real development experience on the PrepWise project. By following these guidelines, you can efficiently convert Figma designs into high-quality, production-ready code. Remember: accuracy and quality always trump speed.