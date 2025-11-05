module.exports = {
  ci: {
    collect: {
      url: ["https://e-commerce-and-admin-ecommerce.vercel.app/"],
      startServerCommand: "npm run start",
      numberOfRuns: 3,
    },
    assert: {
      preset: "lighthouse:recommended",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
