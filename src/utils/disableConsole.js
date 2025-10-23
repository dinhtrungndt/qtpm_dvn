export const disableConsoleInProduction = () => {
  if (process.env.NODE_ENV === "production") {
    const originalError = console.error;
    console.error = (...args) => {
      // Chặn lỗi từ axios hoặc fetch in ra URL
      if (typeof args[0] === "string" && args[0].includes("401")) return;
      if (typeof args[0] === "string" && args[0].includes("api-qtpm-dvn.fly.dev")) return;
      originalError(...args);
    };
  }

};
