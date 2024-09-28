// utils/validation/fileSchema.js
const { z } = require('zod');
 

const fileSchema = z.object({
  folderId: z.number().int().positive(), // Ensure folderId is a positive integer
  file: z.object({
    filename: z.string().min(1), // Validate that the filename is present
    path: z.string().min(1), // Validate that the path is present
    size: z.number().int().positive().max(10 * 1024 * 1024), // Validate file size (max 10MB)
    mimetype: z.string().min(1), // Validate that mimetype is present
  }),
  metadata: z.object({
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }).optional(),
});

module.exports = fileSchema;
