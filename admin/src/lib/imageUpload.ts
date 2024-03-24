const acceptedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
const maxFileSize = 1024 * 1024 * 5 // 5MB

/**
 * Ensure file has name, size and type
 * @param file file to validate
 * @returns
 */
export function isFile(file?: File): file is File {
  if (file === undefined) return false
  return !!(file.name && file.size && file.type)
}

/**
 *
 * @param file file to validate
 * @param required  default is true, if false, file is not required
 * @returns
 */
export function fileError(file?: File, required: boolean = true) {
  if (!required && !file) {
    return null
  }
  if (!isFile(file)) {
    return 'Product image is required.'
  }
  const { type, size } = file
  if (!acceptedTypes.includes(type)) {
    return 'Only png, jpg, gif files are allowed.'
  }
  if (size > maxFileSize) {
    return 'File size is too large, limit is 5MB'
  }
  return null
}
