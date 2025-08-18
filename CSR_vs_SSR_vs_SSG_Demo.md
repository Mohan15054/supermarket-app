# CSR vs SSR vs SSG Practical Demonstration

## 📁 What We Built

I've created a practical demonstration in your supermarket app showing the differences between Client-Side Rendering (CSR), Server-Side Rendering (SSR), and Static Site Generation (SSG).

## 🗂️ New Files Created

### Pages:
- `/src/app/csr/page.js` - Client-Side Rendering demo
- `/src/app/ssr/page.js` - Server-Side Rendering demo  
- `/src/app/ssg/page.js` - Static Site Generation demo
- `/src/app/comparison/page.js` - Detailed comparison table

### Components:
- `/src/components/Navigation/Navigation.js` - Navigation component
- `/src/components/Navigation/navigation.module.css` - Navigation styles

## 🔄 How to Test Each Approach

### 1. **CSR (Client-Side Rendering)**
- **URL:** http://localhost:3000/csr
- **What you'll see:**
  - Loading spinner for 2 seconds
  - Empty page initially (simulate JS loading)
  - Content appears after "API call" completes
  - Products have "CSR" prefix in titles

### 2. **SSR (Server-Side Rendering)**  
- **URL:** http://localhost:3000/ssr
- **What you'll see:**
  - Page loads slower but content appears immediately
  - No loading state
  - Products have "SSR" prefix in titles
  - Server processes data before sending to browser

### 3. **SSG (Static Site Generation)**
- **URL:** http://localhost:3000/ssg  
- **What you'll see:**
  - Fastest loading
  - Immediate content (no loading, no delay)
  - Products have "SSG" prefix in titles
  - Pre-built at build time

### 4. **Comparison Page**
- **URL:** http://localhost:3000/comparison
- Detailed comparison table with pros/cons
- When to use each approach

## 🧪 Testing Instructions

1. **Open your browser** to http://localhost:3000
2. **Use the navigation bar** to switch between different rendering methods
3. **Notice the differences:**
   - CSR: Shows loading state, then content
   - SSR: Immediate content but slower page load
   - SSG: Fastest loading with immediate content
4. **Check Network tab** in DevTools to see the differences in requests
5. **View Page Source** to see HTML differences:
   - CSR: Minimal HTML, content loaded via JS
   - SSR: Full HTML with content
   - SSG: Pre-built HTML with content

## 📊 Key Differences to Observe

| Aspect | CSR | SSR | SSG |
|--------|-----|-----|-----|
| **Initial Load** | Fast HTML, delayed content | Slower, but complete content | Fastest with immediate content |
| **Loading State** | ✅ Shows spinner | ❌ No loading state | ❌ No loading state |
| **SEO** | ❌ Poor initially | ✅ Excellent | ✅ Perfect |
| **Data Freshness** | ✅ Real-time | ✅ Fresh per request | ❌ Build-time only |

## 🔍 Developer Tools Testing

1. **Disable JavaScript** in DevTools:
   - CSR: Page won't work
   - SSR: Page works fine
   - SSG: Page works fine

2. **Check Network Panel:**
   - CSR: See AJAX calls for data
   - SSR: Single request with all data
   - SSG: Minimal requests, cached content

3. **View Page Source:**
   - CSR: Empty content divs
   - SSR: Full HTML with data
   - SSG: Complete pre-built HTML

This demonstration gives you a hands-on understanding of how each rendering approach works in practice!
