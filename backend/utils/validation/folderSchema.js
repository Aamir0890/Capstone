// utils/validation/folderSchema.js
const { z } = require('zod');

const folderSchema = z.object({
  name: z.string().min(1, { message: "Folder name is required" }),  // Validates that the folder name is required
});

module.exports = folderSchema;
