# 🎓 Adam CHIN's Comprehensive Development Instructions
**Classification: ADAMCHINS-CONFIDENTIAL ▲**  
**Version: 1.0**  
**Created: 2025-06-01**  
**Purpose: Personal development methodology extracted from AI Lab success**

---

## 📚 Table of Contents

I. [Communication & Documentation Standards](#i-communication--documentation-standards)  
II. [Teaching Methodology](#ii-teaching-methodology)  
III. [Project Structure & Organization](#iii-project-structure--organization)  
IV. [Coding Standards & Rules](#iv-coding-standards--rules)  
V. [Testing Methods](#v-testing-methods)  
VI. [Modularization Approach](#vi-modularization-approach)  
VII. [UI/UX Development Patterns](#vii-uiux-development-patterns)  
VIII. [Architecture Patterns](#viii-architecture-patterns)  
IX. [Import & Dependency Rules](#ix-import--dependency-rules)  
X. [Development Workflow](#x-development-workflow)  
XI. [Performance & Optimization](#xi-performance--optimization)  
XII. [Security Standards](#xii-security-standards)  
XIII. [AI/ML Specific Patterns](#xiii-aiml-specific-patterns)  
XIV. [Quick Reference Checklists](#xiv-quick-reference-checklists)  
XV. [Personal Preferences Summary](#xv-personal-preferences-summary)

---

## I. Communication & Documentation Standards

### 1. Numbering Hierarchy 📝
**ALWAYS use this structure:**
```
I. Major Sections (Roman numerals)
  1. Primary subsections (Numbers)
    a) Secondary points (Letters)
      - Bullet points for details
      • Sub-bullets when needed
```

### 2. Strategic Emoji Usage 🎯
Use emojis as **visual anchors**, not decoration:
- 📌 Important concepts/rules
- ✅ Completed items/confirmations
- 🚀 Actions/next steps
- 🔍 Analysis/investigation
- 💻 Code/technical details
- 🔧 Configuration/setup
- 🧪 Testing related
- 🎓 Learning/teaching moments
- ❓ Questions/checkpoints
- ⚠️ Warnings/critical info
- 📊 Metrics/data
- 🏗️ Architecture/structure

### 3. Analysis Approach 🔍
When asked to analyze, ALWAYS:
1. Start with "I'll analyze this **comprehensively, thoroughly, and very carefully**"
2. Break down into clear sections
3. Highlight any conflicts or ambiguities
4. Ask for clarification if needed
5. Proceed only when clear

### 4. Documentation Standards 📄
```markdown
# Document Title
**Classification: ADAMCHINS-CONFIDENTIAL ▲**
**Author: [Name]**
**Date: YYYY-MM-DD**
**Version: X.Y**

## 🎯 Purpose
[What this achieves and why it's needed]

## 📋 Overview
[High-level summary]

[Content organized with proper hierarchy]
```

### 5. Progress Reporting 📊
Save all outputs to: `Testing_Result/YYYY-MM-DD_Descriptive_Name.md`

Example names:
- `2025-06-01_Phase2A_Complete_Summary.md`
- `2025-06-01_WebSocket_Implementation_Progress.md`
- `2025-06-01_Model_Integration_Debug_Log.md`

---

## II. Teaching Methodology

### 1. University Professor Style 🎓
**CRITICAL**: Teach step-by-step, don't automate everything

#### Structure:
1. **Theory First**: Explain WHY before HOW
2. **Checkpoint Questions**: Verify understanding
3. **Practical Application**: Hands-on implementation
4. **Verification**: Test what was built
5. **Reflection**: What was learned

#### Example Teaching Flow:
```python
# 🎓 Theory: Why we need dependency injection
"""
Dependency injection separates object creation from usage,
making code more testable and flexible. Here's why...
"""

# ❓ Checkpoint: Do you understand the benefits?

# 💻 Practice: Let's implement it
class Service:
    def __init__(self, repository: IRepository):
        self.repository = repository  # Injected, not created

# 🧪 Verify: Test our implementation
def test_service_with_mock():
    mock_repo = MockRepository()
    service = Service(mock_repo)
    assert service.repository is mock_repo

# 📊 Reflection: What did we achieve?
```

### 2. Interactive Checkpoints ❓
Insert questions throughout:
- "Does this approach make sense?"
- "Should we proceed with this design?"
- "Any concerns before we continue?"
- "What would you prefer here?"

### 3. No Black Boxes 📦
ALWAYS explain:
- What each component does
- Why it's designed this way
- How it connects to others
- What alternatives exist

---

## III. Project Structure & Organization

### 1. Directory Structure 📁
```
project_root/
├── .cursorrules                 # Project-specific AI instructions
├── CLAUDE.md                    # AI assistant context
├── requirements.txt             # Python dependencies
├── environment.yml              # Conda environment
├── pyproject.toml              # Modern Python config
│
├── code/                       # All source code
│   ├── domain/                 # Business logic
│   │   ├── models/            # Domain models
│   │   ├── services/          # Business services
│   │   └── interfaces/        # Abstract contracts
│   │
│   ├── infrastructure/         # Technical implementations
│   │   ├── database/          # Data access
│   │   ├── external/          # Third-party integrations
│   │   └── cache/             # Caching layer
│   │
│   ├── application/            # Use cases
│   │   ├── commands/          # Write operations
│   │   ├── queries/           # Read operations
│   │   └── handlers/          # Request handlers
│   │
│   ├── api/                    # External interfaces
│   │   ├── rest/              # REST endpoints
│   │   ├── websocket/         # WebSocket handlers
│   │   └── graphql/           # GraphQL schema
│   │
│   ├── shared/                 # Cross-cutting concerns
│   │   ├── utils/             # Utility functions
│   │   ├── constants/         # App constants
│   │   └── exceptions/        # Custom exceptions
│   │
│   └── frontend/               # UI code
│       ├── src/
│       │   ├── pages/         # Route components
│       │   ├── components/    # Reusable UI
│       │   ├── hooks/         # Custom React hooks
│       │   ├── services/      # API clients
│       │   └── types/         # TypeScript types
│       └── public/            # Static assets
│
├── tests/                      # Test suite
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   ├── e2e/                   # End-to-end tests
│   └── fixtures/              # Test data
│
├── docs/                       # Documentation
├── scripts/                    # Automation scripts
└── benchmarks/                 # Performance tests
```

### 2. File Naming Conventions 📝
- **Python**: `snake_case.py`
- **TypeScript/React**: `PascalCase.tsx` for components, `camelCase.ts` for others
- **Tests**: `test_module_name.py` or `module_name.test.ts`
- **Documentation**: `UPPERCASE_TOPIC.md` for important docs

---

## IV. Coding Standards & Rules

### 1. Universal Rules 📏
```python
"""
ADAMCHINS [Project Name]
Classification: ADAMCHINS-CONFIDENTIAL ▲
Component: [Domain|Infrastructure|API|Frontend]
Purpose: What this file achieves
Why Needed: Why this exists in the system
Last Updated: YYYY-MM-DD
"""
```

### 2. File Size Limits 📦
- **HARD LIMIT**: 800 lines per file
- **Preferred**: 200-500 lines
- **Split Strategy**: By feature or responsibility

### 3. Function Documentation 📖
```python
def process_order(
    order_id: str,
    user: User,
    options: ProcessOptions | None = None
) -> OrderResult:
    """
    Purpose: Process a customer order through the fulfillment pipeline
    Why Needed: Central orchestration of order processing logic
    
    Args:
        order_id: Unique identifier for the order
        user: User placing the order (for permissions)
        options: Optional processing configuration
        
    Returns:
        OrderResult with status, tracking info, and any errors
        
    Raises:
        OrderNotFoundError: If order_id doesn't exist
        InsufficientStockError: If items are out of stock
        PaymentFailedError: If payment processing fails
        
    Example:
        >>> result = process_order("ORD-123", current_user)
        >>> if result.success:
        ...     print(f"Order shipped: {result.tracking_number}")
    """
```

### 4. Type Hints 🏷️
**MANDATORY for all functions:**
```python
# Good: Full type hints
def calculate_discount(
    price: Decimal,
    discount_percent: float,
    max_discount: Decimal | None = None
) -> Decimal:
    ...

# Bad: Missing type hints
def calculate_discount(price, discount_percent, max_discount=None):
    ...
```

### 5. Import Organization 📚
```python
# Standard library imports
import os
import sys
from datetime import datetime
from typing import List, Optional, Dict

# Third-party imports
import numpy as np
import pandas as pd
from fastapi import FastAPI, Depends
from pydantic import BaseModel

# Local application imports
from app.domain.models import User, Order
from app.infrastructure.database import get_session
from app.shared.constants import MAX_RETRY_ATTEMPTS
```

### 6. Error Handling 🚨
```python
# Create specific exceptions
class DomainError(Exception):
    """Base exception for domain errors"""
    pass

class OrderNotFoundError(DomainError):
    """Raised when order doesn't exist"""
    def __init__(self, order_id: str):
        super().__init__(f"Order not found: {order_id}")
        self.order_id = order_id

# Use comprehensive error handling
try:
    result = await process_order(order_id)
except OrderNotFoundError as e:
    logger.warning(f"Order lookup failed: {e.order_id}")
    raise HTTPException(404, detail=str(e))
except DomainError as e:
    logger.error(f"Domain error: {e}")
    raise HTTPException(400, detail="Invalid request")
except Exception as e:
    logger.exception("Unexpected error in order processing")
    raise HTTPException(500, detail="Internal server error")
```

### 7. Async/Await Patterns ⚡
```python
# Prefer async for I/O operations
async def fetch_user_orders(user_id: str) -> List[Order]:
    async with get_session() as session:
        orders = await session.query(Order).filter_by(user_id=user_id).all()
        return orders

# Use asyncio.gather for parallel operations
async def get_dashboard_data(user_id: str) -> DashboardData:
    orders, profile, notifications = await asyncio.gather(
        fetch_user_orders(user_id),
        fetch_user_profile(user_id),
        fetch_notifications(user_id)
    )
    return DashboardData(
        orders=orders,
        profile=profile,
        notifications=notifications
    )
```

---

## V. Testing Methods

### 1. Test Structure 🧪
```python
# tests/unit/test_order_service.py
"""Tests for order processing service"""

import pytest
from unittest.mock import Mock, AsyncMock
from app.domain.services import OrderService
from app.domain.models import Order, User

class TestOrderService:
    """Test suite for OrderService"""
    
    @pytest.fixture
    def mock_repository(self):
        """Mock repository for testing"""
        repo = Mock()
        repo.get_order = AsyncMock()
        repo.save_order = AsyncMock()
        return repo
    
    @pytest.fixture
    def service(self, mock_repository):
        """OrderService instance with mocked dependencies"""
        return OrderService(repository=mock_repository)
    
    async def test_process_order_success(self, service, mock_repository):
        """Test successful order processing"""
        # Arrange
        order_id = "ORD-123"
        mock_order = Order(id=order_id, status="pending")
        mock_repository.get_order.return_value = mock_order
        
        # Act
        result = await service.process_order(order_id)
        
        # Assert
        assert result.success is True
        assert result.order_id == order_id
        mock_repository.save_order.assert_called_once()
```

### 2. Testing Pyramid 📊
- **60% Unit Tests**: Fast, isolated, many edge cases
- **30% Integration Tests**: Service interactions
- **10% E2E Tests**: Critical user journeys

### 3. Test File Organization 📁
```
tests/
├── conftest.py              # Shared fixtures
├── unit/
│   ├── domain/
│   │   ├── test_models.py
│   │   └── test_services.py
│   ├── infrastructure/
│   │   └── test_repositories.py
│   └── api/
│       └── test_endpoints.py
├── integration/
│   ├── test_order_flow.py
│   └── test_payment_flow.py
└── e2e/
    └── test_checkout_journey.py
```

### 4. Smoke Tests 🔥
Create `smoke_test.py` for quick validation:
```python
#!/usr/bin/env python3
"""Quick smoke test - run after deployment"""

import requests
import sys

API_URL = "http://localhost:8000"

print("🔥 Running smoke tests...")

# 1. Health check
health = requests.get(f"{API_URL}/health")
assert health.status_code == 200, "Health check failed"
print("✅ Health check passed")

# 2. API version
version = requests.get(f"{API_URL}/version")
assert version.json()["version"], "Version endpoint failed"
print("✅ Version check passed")

# 3. Basic functionality
test_data = {"name": "test"}
response = requests.post(f"{API_URL}/api/test", json=test_data)
assert response.status_code == 200, "Test endpoint failed"
print("✅ Basic functionality passed")

print("🎉 All smoke tests passed!")
```

---

## VI. Modularization Approach

### 1. Module Design Principles 🏗️
- **Single Responsibility**: Each module does one thing well
- **High Cohesion**: Related functionality stays together
- **Low Coupling**: Minimal dependencies between modules
- **Interface Segregation**: Depend on abstractions, not implementations

### 2. Module Structure 📦
```python
# domain/order/module.py
"""Order processing module"""

from .models import Order, OrderItem, OrderStatus
from .services import OrderService, OrderValidator
from .interfaces import IOrderRepository
from .events import OrderCreated, OrderShipped

__all__ = [
    'Order', 'OrderItem', 'OrderStatus',
    'OrderService', 'OrderValidator',
    'IOrderRepository',
    'OrderCreated', 'OrderShipped'
]
```

### 3. Feature Modules 🎯
Organize by feature, not by file type:
```
features/
├── authentication/
│   ├── models.py
│   ├── services.py
│   ├── api.py
│   └── tests.py
├── orders/
│   ├── models.py
│   ├── services.py
│   ├── api.py
│   └── tests.py
└── payments/
    ├── models.py
    ├── services.py
    ├── api.py
    └── tests.py
```

### 4. Dependency Management 🔗
```python
# Use dependency injection
class OrderService:
    def __init__(
        self,
        repository: IOrderRepository,
        payment_service: IPaymentService,
        notification_service: INotificationService
    ):
        self._repository = repository
        self._payment = payment_service
        self._notification = notification_service
```

---

## VII. UI/UX Development Patterns

### 1. React Component Structure 🎨
```typescript
/**
 * ADAMCHINS [Project Name]
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: OrderList
 * Purpose: Display paginated list of customer orders
 */

import { FC, memo, useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Order } from '@/types/order';

interface OrderListProps {
  userId: string;
  onOrderSelect?: (order: Order) => void;
}

export const OrderList: FC<OrderListProps> = memo(({ userId, onOrderSelect }) => {
  // State
  const [page, setPage] = useState(1);
  
  // Data fetching
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders', userId, page],
    queryFn: () => fetchOrders(userId, page),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Event handlers
  const handleOrderClick = useCallback((order: Order) => {
    onOrderSelect?.(order);
  }, [onOrderSelect]);
  
  // Loading state
  if (isLoading) {
    return <OrderListSkeleton />;
  }
  
  // Error state
  if (error) {
    return <ErrorBoundary error={error} />;
  }
  
  // Empty state
  if (!data?.orders.length) {
    return <EmptyState message="No orders found" />;
  }
  
  // Render
  return (
    <div className="order-list">
      {data.orders.map(order => (
        <OrderCard
          key={order.id}
          order={order}
          onClick={() => handleOrderClick(order)}
        />
      ))}
      <Pagination
        current={page}
        total={data.totalPages}
        onChange={setPage}
      />
    </div>
  );
});

OrderList.displayName = 'OrderList';
```

### 2. State Management Patterns 🔄
```typescript
// Custom hook for complex state
export function useOrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderFilter>({});
  const [loading, setLoading] = useState(false);
  
  const filteredOrders = useMemo(
    () => filterOrders(orders, filter),
    [orders, filter]
  );
  
  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await orderApi.fetchOrders(filter);
      setOrders(data);
    } finally {
      setLoading(false);
    }
  }, [filter]);
  
  return {
    orders: filteredOrders,
    loading,
    setFilter,
    loadOrders,
  };
}
```

### 3. Form Handling 📝
```typescript
// Using react-hook-form with Zod validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.number().min(1).max(100),
  })).min(1),
  shippingAddress: z.object({
    street: z.string().min(5),
    city: z.string().min(2),
    zipCode: z.string().regex(/^\d{5}$/),
  }),
});

type OrderForm = z.infer<typeof orderSchema>;

export function CreateOrderForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
  });
  
  const onSubmit = async (data: OrderForm) => {
    // Process order
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

### 4. Loading States ⏳
```typescript
// Consistent loading patterns
export const LoadingStates = {
  // Skeleton loading for lists
  ListSkeleton: () => (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-20 bg-gray-200 animate-pulse rounded" />
      ))}
    </div>
  ),
  
  // Spinner for actions
  Spinner: () => (
    <div className="flex justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  ),
  
  // Progress bar for uploads
  ProgressBar: ({ progress }: { progress: number }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  ),
};
```

### 5. Error Boundaries 🚨
```typescript
class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error tracking service
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-red-800 font-semibold">Something went wrong</h2>
          <p className="text-red-600">{this.state.error?.message}</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

---

## VIII. Architecture Patterns

### 1. Clean Architecture Layers 🏗️
```
┌─────────────────────────────────────┐
│          Presentation               │ ← UI Components, Controllers
├─────────────────────────────────────┤
│          Application                │ ← Use Cases, DTOs
├─────────────────────────────────────┤
│            Domain                   │ ← Business Logic, Entities
├─────────────────────────────────────┤
│         Infrastructure              │ ← Database, External Services
└─────────────────────────────────────┘

Dependencies flow inward only ↑
```

### 2. Repository Pattern 📚
```python
# Domain layer - interface
from abc import ABC, abstractmethod

class IOrderRepository(ABC):
    @abstractmethod
    async def get_by_id(self, order_id: str) -> Order | None:
        pass
    
    @abstractmethod
    async def save(self, order: Order) -> None:
        pass
    
    @abstractmethod
    async def find_by_user(self, user_id: str) -> List[Order]:
        pass

# Infrastructure layer - implementation
class SQLOrderRepository(IOrderRepository):
    def __init__(self, session_factory):
        self._session_factory = session_factory
    
    async def get_by_id(self, order_id: str) -> Order | None:
        async with self._session_factory() as session:
            result = await session.execute(
                select(OrderModel).where(OrderModel.id == order_id)
            )
            order_model = result.scalar_one_or_none()
            return Order.from_orm(order_model) if order_model else None
```

### 3. Service Pattern 🔧
```python
class OrderService:
    """Orchestrates order-related business operations"""
    
    def __init__(
        self,
        order_repo: IOrderRepository,
        payment_service: IPaymentService,
        inventory_service: IInventoryService,
        notification_service: INotificationService
    ):
        self._orders = order_repo
        self._payment = payment_service
        self._inventory = inventory_service
        self._notifications = notification_service
    
    async def create_order(
        self,
        user: User,
        items: List[OrderItem]
    ) -> OrderResult:
        """
        Creates a new order with full validation and processing
        """
        # 1. Validate inventory
        for item in items:
            available = await self._inventory.check_availability(
                item.product_id,
                item.quantity
            )
            if not available:
                raise InsufficientStockError(item.product_id)
        
        # 2. Calculate pricing
        total = self._calculate_total(items)
        
        # 3. Create order
        order = Order(
            user_id=user.id,
            items=items,
            total=total,
            status=OrderStatus.PENDING
        )
        
        # 4. Process payment
        payment_result = await self._payment.charge(
            user.payment_method,
            total
        )
        
        if not payment_result.success:
            raise PaymentFailedError(payment_result.error)
        
        # 5. Reserve inventory
        for item in items:
            await self._inventory.reserve(
                item.product_id,
                item.quantity,
                order.id
            )
        
        # 6. Save order
        order.status = OrderStatus.CONFIRMED
        order.payment_id = payment_result.transaction_id
        await self._orders.save(order)
        
        # 7. Send notifications
        await self._notifications.send_order_confirmation(order)
        
        return OrderResult(success=True, order=order)
```

### 4. CQRS Pattern 📊
```python
# Commands (Write)
class CreateOrderCommand:
    user_id: str
    items: List[OrderItem]
    shipping_address: Address

class CreateOrderHandler:
    async def handle(self, command: CreateOrderCommand) -> str:
        # Business logic for creating order
        order = await self._order_service.create_order(...)
        return order.id

# Queries (Read)
class GetOrdersByUserQuery:
    user_id: str
    status: OrderStatus | None = None
    limit: int = 20

class GetOrdersByUserHandler:
    async def handle(self, query: GetOrdersByUserQuery) -> List[OrderDTO]:
        # Optimized read query
        orders = await self._read_repository.find_orders(
            user_id=query.user_id,
            status=query.status,
            limit=query.limit
        )
        return [OrderDTO.from_domain(order) for order in orders]
```

### 5. Event-Driven Patterns 📢
```python
# Domain Events
@dataclass
class OrderCreatedEvent:
    order_id: str
    user_id: str
    total_amount: Decimal
    timestamp: datetime

# Event Publisher
class EventPublisher:
    async def publish(self, event: DomainEvent) -> None:
        # Publish to message queue
        await self._queue.send(event)

# Event Handlers
class OrderCreatedHandler:
    async def handle(self, event: OrderCreatedEvent) -> None:
        # Send email
        await self._email_service.send_order_confirmation(event.order_id)
        
        # Update analytics
        await self._analytics.track_order_created(event)
        
        # Start fulfillment
        await self._fulfillment.initiate_order(event.order_id)
```

---

## IX. Import & Dependency Rules

### 1. Import Order 📚
```python
# 1. Future imports (Python 3.7+)
from __future__ import annotations

# 2. Standard library - core modules
import os
import sys
import json
from datetime import datetime, timedelta
from pathlib import Path

# 3. Standard library - typing
from typing import (
    Any, Dict, List, Optional, Union,
    Callable, TypeVar, Generic, Protocol
)

# 4. Third-party libraries - major frameworks
import numpy as np
import pandas as pd
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import select, and_, or_
from pydantic import BaseModel, Field, validator

# 5. Third-party libraries - utilities
from loguru import logger
from tenacity import retry, stop_after_attempt

# 6. Local imports - absolute paths
from app.domain.models import User, Order
from app.domain.services import OrderService
from app.infrastructure.database import get_session
from app.shared.constants import MAX_RETRIES

# 7. Local imports - relative (only within module)
from .utils import calculate_hash
from .validators import validate_email
```

### 2. Dependency Management 🔗
```python
# pyproject.toml - Modern Python packaging
[tool.poetry]
name = "adamchins-project"
version = "1.0.0"

[tool.poetry.dependencies]
python = "^3.11"
fastapi = "^0.104.0"
pydantic = "^2.5.0"
sqlalchemy = "^2.0.0"
asyncpg = "^0.29.0"

[tool.poetry.group.dev.dependencies]
pytest = "^7.4.0"
pytest-asyncio = "^0.21.0"
black = "^23.0.0"
ruff = "^0.1.0"
mypy = "^1.7.0"

[tool.poetry.group.test.dependencies]
pytest-cov = "^4.1.0"
faker = "^20.0.0"
factory-boy = "^3.3.0"
```

### 3. Version Pinning 📌
```txt
# requirements.txt - Always pin exact versions
fastapi==0.104.1
pydantic==2.5.2
sqlalchemy==2.0.23
alembic==1.12.1
asyncpg==0.29.0
redis==5.0.1
celery==5.3.4
```

### 4. Import Rules ⚠️
```python
# ❌ NEVER: Star imports
from app.models import *

# ❌ NEVER: Circular imports
# file: services.py
from app.repositories import UserRepo  # If UserRepo imports services

# ✅ GOOD: Explicit imports
from app.models import User, Order, Product

# ✅ GOOD: Type-only imports for circular dependencies
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from app.repositories import UserRepo
```

---

## X. Development Workflow

### 1. Git Workflow 🌿
```bash
# Branch naming
feature/add-payment-integration
bugfix/fix-order-calculation
hotfix/security-patch-auth
chore/update-dependencies
docs/api-documentation

# Commit message format
<type>(<scope>): <subject>

# Types: feat, fix, docs, style, refactor, test, chore
# Examples:
feat(orders): add bulk order processing
fix(auth): resolve token expiration issue
docs(api): update order endpoint documentation
test(payments): add integration tests for Stripe
```

### 2. Development Cycle 🔄
```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Write tests first (TDD)
# Create test_new_feature.py

# 3. Implement feature
# Write minimal code to pass tests

# 4. Run tests locally
pytest tests/unit/test_new_feature.py -v

# 5. Check code quality
black .
ruff check .
mypy .

# 6. Run all tests
pytest --cov=app --cov-report=html

# 7. Commit with meaningful message
git add .
git commit -m "feat(module): add new feature with tests"

# 8. Push and create PR
git push origin feature/new-feature
```

### 3. Code Review Checklist ✅
Before submitting PR:
- [ ] All tests pass
- [ ] Code coverage > 80%
- [ ] No linting errors
- [ ] Type hints complete
- [ ] Documentation updated
- [ ] No hardcoded values
- [ ] Error handling comprehensive
- [ ] Performance considered
- [ ] Security reviewed
- [ ] Backward compatible

### 4. Continuous Integration 🔄
```yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        pip install poetry
        poetry install
    
    - name: Run linting
      run: |
        poetry run black --check .
        poetry run ruff check .
        poetry run mypy .
    
    - name: Run tests
      run: |
        poetry run pytest --cov=app --cov-report=xml
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
```

---

## XI. Performance & Optimization

### 1. Profiling First 📊
```python
# Always measure before optimizing
import cProfile
import pstats
from memory_profiler import profile

@profile
def process_large_dataset(data: List[Dict]) -> pd.DataFrame:
    # Function to profile
    pass

# Run profiler
profiler = cProfile.Profile()
profiler.enable()
result = process_large_dataset(data)
profiler.disable()

# Analyze results
stats = pstats.Stats(profiler)
stats.sort_stats('cumulative')
stats.print_stats(20)  # Top 20 time consumers
```

### 2. Caching Strategies 💾
```python
from functools import lru_cache
from cachetools import TTLCache
import redis

# 1. Simple in-memory cache
@lru_cache(maxsize=1000)
def expensive_calculation(x: int, y: int) -> int:
    # Complex calculation
    return result

# 2. TTL cache for time-sensitive data
user_cache = TTLCache(maxsize=1000, ttl=300)  # 5 minutes

@cached(cache=user_cache)
async def get_user_profile(user_id: str) -> UserProfile:
    # Fetch from database
    pass

# 3. Redis for distributed cache
class RedisCache:
    def __init__(self, redis_client: redis.Redis):
        self._redis = redis_client
    
    async def get_or_set(
        self,
        key: str,
        factory: Callable,
        ttl: int = 3600
    ) -> Any:
        # Try cache first
        cached = await self._redis.get(key)
        if cached:
            return json.loads(cached)
        
        # Generate and cache
        value = await factory()
        await self._redis.setex(
            key,
            ttl,
            json.dumps(value, default=str)
        )
        return value
```

### 3. Database Optimization 🗄️
```python
# 1. Use select_related/prefetch_related
async def get_orders_with_items(user_id: str):
    # Bad: N+1 queries
    orders = await Order.filter(user_id=user_id).all()
    for order in orders:
        items = await order.items.all()  # Extra query per order!
    
    # Good: Single query with join
    orders = await Order.filter(user_id=user_id)\
        .prefetch_related('items')\
        .all()

# 2. Use database indexes
class Order(Base):
    __tablename__ = 'orders'
    
    id = Column(String, primary_key=True)
    user_id = Column(String, index=True)  # Index for queries
    created_at = Column(DateTime, index=True)
    status = Column(Enum(OrderStatus), index=True)
    
    # Composite index for common queries
    __table_args__ = (
        Index('idx_user_status', 'user_id', 'status'),
    )

# 3. Batch operations
async def bulk_update_orders(updates: List[Dict]):
    # Bad: Individual updates
    for update in updates:
        await session.execute(
            update(Order).where(Order.id == update['id']).values(update)
        )
    
    # Good: Bulk update
    await session.execute(
        update(Order),
        updates
    )
    await session.commit()
```

### 4. Async Performance ⚡
```python
# 1. Use asyncio.gather for parallel operations
async def get_dashboard_data(user_id: str):
    # Bad: Sequential
    profile = await get_user_profile(user_id)
    orders = await get_user_orders(user_id)
    stats = await get_user_stats(user_id)
    
    # Good: Parallel
    profile, orders, stats = await asyncio.gather(
        get_user_profile(user_id),
        get_user_orders(user_id),
        get_user_stats(user_id)
    )

# 2. Use connection pooling
from asyncpg import create_pool

class DatabasePool:
    def __init__(self, dsn: str):
        self._pool = None
        self._dsn = dsn
    
    async def init(self):
        self._pool = await create_pool(
            self._dsn,
            min_size=10,
            max_size=20,
            max_queries=50000,
            max_inactive_connection_lifetime=300.0
        )

# 3. Stream large datasets
async def stream_large_results():
    async with get_session() as session:
        # Use server-side cursor
        async with session.stream(
            select(Order).execution_options(stream_results=True)
        ) as result:
            async for order in result:
                yield process_order(order)
```

---

## XII. Security Standards

### 1. Input Validation 🛡️
```python
from pydantic import BaseModel, validator, Field
import bleach

class UserInput(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    bio: str = Field(..., max_length=500)
    
    @validator('username')
    def validate_username(cls, v):
        if not v.replace('_', '').replace('-', '').isalnum():
            raise ValueError('Username must be alphanumeric')
        return v.lower()
    
    @validator('bio')
    def sanitize_bio(cls, v):
        # Remove dangerous HTML
        return bleach.clean(v, tags=['b', 'i', 'em', 'strong'])
```

### 2. Authentication & Authorization 🔐
```python
from fastapi import Security, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

security = HTTPBearer()

async def verify_token(
    credentials: HTTPAuthorizationCredentials = Security(security)
) -> User:
    token = credentials.credentials
    
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid authentication credentials"
            )
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Token has expired"
        )
    except jwt.JWTError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials"
        )
    
    user = await get_user(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user
```

### 3. SQL Injection Prevention 🔒
```python
# ❌ NEVER: String concatenation
query = f"SELECT * FROM users WHERE email = '{email}'"

# ❌ NEVER: String formatting
query = "SELECT * FROM users WHERE email = %s" % email

# ✅ GOOD: Parameterized queries
from sqlalchemy import text

# SQLAlchemy
result = await session.execute(
    select(User).where(User.email == email)
)

# Raw SQL with parameters
result = await session.execute(
    text("SELECT * FROM users WHERE email = :email"),
    {"email": email}
)
```

### 4. Environment Variables 🔐
```python
# config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str
    DATABASE_POOL_SIZE: int = 20
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # External services
    REDIS_URL: str
    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str
    
    # Feature flags
    ENABLE_DEBUG: bool = False
    ENABLE_PROFILING: bool = False
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

settings = Settings()

# Usage
if settings.ENABLE_DEBUG:
    app.add_middleware(DebugMiddleware)
```

### 5. Rate Limiting 🚦
```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/api/orders")
@limiter.limit("5/minute")
async def create_order(request: Request, order: OrderCreate):
    # Limit to 5 orders per minute per IP
    pass

# Custom rate limiting
class RateLimiter:
    def __init__(self, redis_client: redis.Redis):
        self._redis = redis_client
    
    async def check_rate_limit(
        self,
        key: str,
        limit: int,
        window: int
    ) -> bool:
        current = await self._redis.incr(key)
        if current == 1:
            await self._redis.expire(key, window)
        return current <= limit
```

---

## XIII. AI/ML Specific Patterns

### 1. Model Loading Strategy 🤖
```python
# Singleton pattern for model management
class ModelManager:
    _instance = None
    _model = None
    _tokenizer = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    async def load_model(self, model_name: str):
        if self._model is None:
            # CPU-first loading for MPS
            with torch.device('cpu'):
                self._model = AutoModelForCausalLM.from_pretrained(
                    model_name,
                    torch_dtype=torch.float16,
                    low_cpu_mem_usage=True
                )
                self._tokenizer = AutoTokenizer.from_pretrained(model_name)
            
            # Move to target device
            device = torch.device('mps' if torch.backends.mps.is_available() else 'cpu')
            self._model = self._model.to(device)
            
        return self._model, self._tokenizer
```

### 2. Inference Pipeline 🔄
```python
class InferencePipeline:
    def __init__(self, model_manager: ModelManager):
        self._model_manager = model_manager
        self._metrics = MetricsCollector()
    
    async def generate(
        self,
        prompt: str,
        max_tokens: int = 150,
        temperature: float = 0.7,
        domain: str = "general"
    ) -> InferenceResult:
        start_time = time.time()
        
        # 1. Load model and tokenizer
        model, tokenizer = await self._model_manager.get_model()
        
        # 2. Apply chat template (for instruct models)
        messages = [{"role": "user", "content": prompt}]
        formatted_prompt = tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True
        )
        
        # 3. Tokenize
        inputs = tokenizer(
            formatted_prompt,
            return_tensors="pt",
            truncation=True,
            max_length=2048
        ).to(model.device)
        
        # 4. Generate
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_new_tokens=max_tokens,
                temperature=temperature,
                do_sample=True,
                top_p=0.95,
                pad_token_id=tokenizer.eos_token_id
            )
        
        # 5. Decode
        generated_ids = outputs[0][inputs['input_ids'].shape[-1]:]
        response = tokenizer.decode(generated_ids, skip_special_tokens=True)
        
        # 6. Clean response
        response = self._clean_response(response)
        
        # 7. Collect metrics
        inference_time = time.time() - start_time
        tokens_generated = len(generated_ids)
        
        await self._metrics.record(
            domain=domain,
            tokens=tokens_generated,
            time_ms=inference_time * 1000
        )
        
        return InferenceResult(
            text=response,
            tokens_generated=tokens_generated,
            inference_time_ms=inference_time * 1000,
            domain=domain
        )
```

### 3. LoRA Adapter Management 🔄
```python
class LoRAAdapterManager:
    def __init__(self, base_model_name: str):
        self._base_model_name = base_model_name
        self._adapters = {}
        self._current_adapter = None
        
    async def load_adapter(self, adapter_name: str, adapter_path: str):
        """Load a LoRA adapter"""
        if adapter_name not in self._adapters:
            config = LoraConfig.from_pretrained(adapter_path)
            self._adapters[adapter_name] = {
                'config': config,
                'path': adapter_path,
                'loaded': False
            }
    
    async def switch_adapter(self, adapter_name: str):
        """Switch to a different adapter with zero downtime"""
        if adapter_name == self._current_adapter:
            return
        
        if adapter_name not in self._adapters:
            raise ValueError(f"Unknown adapter: {adapter_name}")
        
        # Load adapter weights
        model = await self._get_base_model()
        adapter_path = self._adapters[adapter_name]['path']
        
        # Apply adapter
        model = PeftModel.from_pretrained(
            model,
            adapter_path,
            adapter_name=adapter_name
        )
        model.set_adapter(adapter_name)
        
        self._current_adapter = adapter_name
        logger.info(f"Switched to adapter: {adapter_name}")
```

### 4. Streaming Generation 🌊
```python
class StreamingGenerator:
    async def generate_stream(
        self,
        prompt: str,
        websocket: WebSocket
    ):
        """Generate tokens and stream them via WebSocket"""
        model, tokenizer = await self._model_manager.get_model()
        
        # Prepare input
        inputs = tokenizer(prompt, return_tensors="pt")
        
        # Custom generate with callback
        generated_tokens = []
        
        def token_callback(token_id):
            # Decode single token
            token_text = tokenizer.decode([token_id], skip_special_tokens=True)
            generated_tokens.append(token_id)
            
            # Send via WebSocket
            asyncio.create_task(
                websocket.send_json({
                    "type": "token",
                    "content": token_text,
                    "position": len(generated_tokens) - 1
                })
            )
        
        # Start generation
        await websocket.send_json({
            "type": "start",
            "timestamp": datetime.utcnow().isoformat()
        })
        
        # Generate with streaming
        with torch.no_grad():
            for _ in range(max_tokens):
                outputs = model(**inputs)
                next_token_logits = outputs.logits[0, -1, :]
                next_token_id = torch.multinomial(
                    F.softmax(next_token_logits, dim=-1),
                    num_samples=1
                )
                
                token_callback(next_token_id.item())
                
                # Update inputs for next iteration
                inputs['input_ids'] = torch.cat(
                    [inputs['input_ids'], next_token_id.unsqueeze(0)],
                    dim=1
                )
                
                # Check for EOS
                if next_token_id == tokenizer.eos_token_id:
                    break
        
        # Send completion
        await websocket.send_json({
            "type": "end",
            "tokens_total": len(generated_tokens),
            "timestamp": datetime.utcnow().isoformat()
        })
```

---

## XIV. Quick Reference Checklists

### 1. New Project Setup ✅
```bash
# 1. Initialize project
mkdir project-name && cd project-name
git init

# 2. Create virtual environment
python -m venv venv
# OR with conda
conda create -n project-name python=3.11

# 3. Create project structure
mkdir -p code/{domain,infrastructure,application,api,frontend,shared}
mkdir -p tests/{unit,integration,e2e}
mkdir -p docs scripts benchmarks

# 4. Initialize configuration
touch .cursorrules CLAUDE.md requirements.txt
touch pyproject.toml .env.example .gitignore

# 5. Setup pre-commit hooks
pip install pre-commit
pre-commit install

# 6. Create initial documentation
echo "# Project Name" > README.md
echo "# Development Guide" > docs/DEVELOPMENT.md
```

### 2. Before Every Commit ✅
- [ ] All tests pass (`pytest`)
- [ ] Code formatted (`black .`)
- [ ] Linting clean (`ruff check .`)
- [ ] Type checking passes (`mypy .`)
- [ ] Documentation updated
- [ ] No hardcoded secrets
- [ ] Commit message follows format
- [ ] Changes are atomic

### 3. API Endpoint Checklist ✅
- [ ] Input validation with Pydantic
- [ ] Error handling for all cases
- [ ] Authentication/authorization
- [ ] Rate limiting configured
- [ ] OpenAPI documentation
- [ ] Unit tests written
- [ ] Integration test added
- [ ] Performance acceptable

### 4. Component Development ✅
- [ ] Props interface defined
- [ ] Loading state handled
- [ ] Error boundary exists
- [ ] Memoization considered
- [ ] Accessibility checked
- [ ] Responsive design
- [ ] Unit tests written
- [ ] Storybook story added

### 5. Database Change ✅
- [ ] Migration script created
- [ ] Rollback tested
- [ ] Indexes optimized
- [ ] Foreign keys correct
- [ ] Data migration planned
- [ ] Performance impact assessed
- [ ] Backup strategy confirmed

---

## XV. Personal Preferences Summary

### 1. Communication Style 💬
- **Analysis**: "Comprehensively, thoroughly, very carefully"
- **Structure**: Clear hierarchy with emojis as anchors
- **Teaching**: University professor approach
- **Progress**: Regular checkpoints and questions
- **Documentation**: Semantic file naming in Testing_Result/

### 2. Development Philosophy 🎯
- **Understanding First**: Know WHY before HOW
- **Incremental Progress**: Small, verified steps
- **Quality Over Speed**: Do it right the first time
- **Teaching Mindset**: Explain while building
- **Pattern Recognition**: Extract and apply learnings

### 3. Code Preferences 💻
- **Explicit Over Implicit**: Clear, self-documenting code
- **Type Safety**: Full type hints everywhere
- **Error Handling**: Comprehensive and informative
- **Testing**: TDD with high coverage
- **Documentation**: Part of the code, not afterthought

### 4. Architecture Preferences 🏗️
- **Clean Architecture**: Clear layer separation
- **SOLID Principles**: Especially dependency inversion
- **Interface-First**: Design contracts before implementation
- **Domain-Driven**: Business logic at the center
- **Event-Driven**: Loose coupling between components

### 5. Workflow Preferences 🔄
- **Git Discipline**: Meaningful commits, clear branches
- **Continuous Testing**: Test at every level
- **Progressive Enhancement**: Start simple, add complexity
- **Performance Awareness**: Measure, don't guess
- **Security First**: Build it in, don't bolt it on

---

## 🎓 Final Words

This guide captures the essence of what made the ADAMCHINS AI Lab development successful. The key principles:

1. **Clarity Through Structure**: Organization enables understanding
2. **Learning Through Teaching**: Explaining deepens knowledge
3. **Quality Through Process**: Good habits produce good code
4. **Success Through Iteration**: Progress beats perfection

Remember: **"The best code is not just working code, but code that teaches."**

---

**Adam CHIN**  
*Making the complex simple, one pattern at a time.*