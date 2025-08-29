

// Mock API responses for frontend-only mode
export const mainFormHandlerTypeRaw = async ({ method, type, fromData, token, count }) => {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 300));

  // Mocked data for products
  const mockProducts = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    price: (Math.random() * 100).toFixed(2),
    description: `Description for product ${i + 1}`,
    imageCover: `/images/food ${((i % 5) + 2)}.jpeg`,
    category: { name: ["Fruits", "Vegetables", "Dairy", "Bakery"][i % 4] },
  }));

  // Mocked user: support both 'name' and 'username' fields from form
  let mockUserName = fromData?.name || fromData?.username;
  // On login, if no name is provided, use the one from localStorage if available
  if (!mockUserName && type === "api/v1/auth/signin" && typeof window !== "undefined") {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.name) {
        mockUserName = storedUser.name;
      }
    } catch {}
  }
  const mockUser = {
    id: 1,
    name: mockUserName || "Test User",
    email: fromData?.email || "test@example.com",
  };

  // Mocked token
  const mockToken = "mocked-jwt-token";

  // Routing logic
  if (type === "api/v1/products" && method === "get") {
    return { data: { data: mockProducts }, status: 200 };
  }
  if (type === "api/v1/auth/signin" && method === "post") {
    return { data: { user: mockUser, token: mockToken, message: "success" }, status: 200 };
  }
  if (type === "api/v1/auth/signup" && method === "post") {
    return { data: { user: mockUser, message: "success" }, status: 201 };
  }
  if (type === "api/v1/categories" && method === "get") {
    return { data: { data: [
      { id: 1, name: "Fruits" },
      { id: 2, name: "Vegetables" },
      { id: 3, name: "Dairy" },
      { id: 4, name: "Bakery" },
    ] }, status: 200 };
  }
  if (type === "api/v1/brands" && method === "get") {
    return { data: { data: [
      { id: 1, name: "Brand A" },
      { id: 2, name: "Brand B" },
      { id: 3, name: "Brand C" },
    ] }, status: 200 };
  }
  // Add more mocks as needed for your app

  // Default mock response
  return { data: { message: "success" }, status: 200 };
};

