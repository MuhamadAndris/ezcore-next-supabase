# Sales Management System

A web-based sales management system built with **Next.js** and **Supabase** for managing products, inventory, promotions, transactions, and sales reports.

## 🎨 UI/UX Design

The UI/UX design of this application is created using Figma.

**Figma Design:**
[Open Figma Design](https://www.figma.com/design/IcupmKmgT1gf2pvDzxeRLL/Untitled?node-id=5-2&p=f&t=CiZzz0GYHrxKhfEw-0)

---

## 🗄️ Database Design

The database uses **PostgreSQL through Supabase**.

The database structure is designed using an Entity Relationship Diagram (ERD).

**ERD:**
[View ERD](#)

Database schema:

```text
products
    │
    ├── product_images
    │
    └── promotion_products
              │
              └── promotions

products
    │
    └── transaction_items
              │
              └── transactions

products
    │
    └── stock_movements

transactions
    │
    └── transaction_items
```

The database design files are also maintained inside this repository:

```text
database/
├── schema.dbml
└── migrations/
```

---

## 🏗️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

### Backend

* Next.js
* API Routes
* PostgreSQL

### Database & Storage

* Supabase PostgreSQL
* Supabase Storage

### Development

* Git
* GitHub
* Figma
* dbdiagram.io

---

## ✨ Features

### Product Management

* Create products
* Edit products
* Delete products
* Product categories
* Product pricing
* Product images
* Multiple images per product

### Promotion Management

* Create promotions
* Set promotion type
* Percentage discount
* Fixed amount discount
* Promotion start and end date
* Assign promotions to products

### Inventory Management

* Stock management
* Stock incoming
* Stock outgoing
* Stock adjustment
* Stock movement history

### Sales Management

* Create sales transactions
* Transaction details
* Product quantity
* Discount
* Final selling price
* Transaction history

### Reports

* Sales report
* Product sales
* Transaction summary
* Stock report
* Promotion performance

---

## 📁 Project Structure

```text
.
├── app/
│   ├── api/
│   ├── dashboard/
│   └── ...
│
├── components/
│   ├── ui/
│   └── ...
│
├── lib/
│   ├── supabase/
│   └── ...
│
├── services/
│   ├── product.service.ts
│   ├── promotion.service.ts
│   ├── transaction.service.ts
│   └── ...
│
├── schemas/
│   ├── product.schema.ts
│   ├── promotion.schema.ts
│   └── ...
│
├── database/
│   ├── schema.dbml
│   └── migrations/
│
├── public/
│
├── README.md
├── package.json
└── ...
```

---

## 🗃️ Database

The application uses Supabase for database and file storage.

### Products

Stores the main product information.

```text
products
├── id
├── sku
├── name
├── price
├── category_id
├── created_at
└── updated_at
```

### Product Images

Stores references to product images stored in Supabase Storage.

```text
product_images
├── id
├── product_id
├── image_path
├── created_at
└── updated_at
```

Each product can have multiple images.

```text
products
    │
    └── product_images
            ├── image 1
            ├── image 2
            └── image 3
```

### Promotions

Stores promotion rules.

```text
promotions
├── id
├── name
├── type
├── value
├── start_at
├── end_at
├── is_active
├── created_at
└── updated_at
```

### Promotion Products

Connects promotions with products.

```text
promotion_products
├── promotion_id
└── product_id
```

This allows one promotion to be applied to multiple products.

---

## 💰 Pricing Logic

The product's normal price is stored in the `products` table.

Promotions do **not** overwrite the normal product price.

```text
Normal Price
     │
     ▼
  Promotion
     │
     ▼
 Final Price
```

For example:

```text
Normal Price : Rp500.000
Promotion    : 20%
Final Price  : Rp400.000
```

The final price used during a transaction is stored as a snapshot in the transaction data so historical transactions are not affected by future price or promotion changes.

---

## 🖼️ Product Images

Product image files are stored in **Supabase Storage**.

The database stores only the image path.

```text
Supabase Storage
└── product-images/
    ├── products/1/image-1.jpg
    ├── products/1/image-2.jpg
    └── products/2/image-1.jpg
```

Database:

```text
product_images
┌────┬────────────┬─────────────────────────┐
│ id │ product_id │ image_path              │
├────┼────────────┼─────────────────────────┤
│ 1  │ 1          │ products/1/image-1.jpg │
│ 2  │ 1          │ products/1/image-2.jpg │
│ 3  │ 2          │ products/2/image-1.jpg │
└────┴────────────┴─────────────────────────┘
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MuhamadAndris/ezcore-next-supabase.git
cd ezcore-next-supabase
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔐 Environment Variables

Do not commit `.env.local` to GitHub.

Make sure it is included in `.gitignore`:

```text
.env
.env.local
.env.*.local
```

---

## 📌 Project Status

🚧 **Currently in development**

The project is actively being developed and additional features will be added over time.

---

## 📄 License

This project is for learning and development purposes.
