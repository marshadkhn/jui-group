/**
 * Asset URL utility for loading GLTF models and other static assets
 * Ensures proper path resolution in both development and production (Vercel)
 */

/**
 * Gets the base URL for the application
 * In Next.js, we use the window.location.origin for client-side
 */
function getBaseUrl(): string {
  // Client-side: use window.location.origin
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  
  // Server-side: use Vercel URL if available, otherwise localhost
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  return "http://localhost:3000";
}

/**
 * Resolves an asset path to a full URL
 * @param path - The asset path relative to the public folder (e.g., "/assets/earth/earth.gltf")
 * @returns The full URL to the asset
 */
export function getAssetUrl(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
  // In Next.js, assets in the public folder are served from the root
  // We'll use the absolute path with the base URL for better reliability
  const fullUrl = `${getBaseUrl()}${normalizedPath}`;
  
  // Log the resolved URL for debugging
  console.log(`[Asset Loader] Resolving asset: ${path} -> ${fullUrl}`);
  
  return fullUrl;
}

/**
 * Validates that an asset exists by attempting to fetch its headers
 * @param url - The URL to validate
 * @returns Promise that resolves to true if asset exists, false otherwise
 */
export async function validateAssetExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    
    if (!response.ok) {
      console.error(
        `[Asset Loader] Asset not found (${response.status}): ${url}`
      );
      return false;
    }
    
    // Check Content-Type to ensure it's not an HTML error page
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("text/html")) {
      console.error(
        `[Asset Loader] Asset returned HTML instead of expected file type: ${url}`
      );
      console.error(
        `[Asset Loader] This usually means the file doesn't exist and a 404 page was served`
      );
      return false;
    }
    
    console.log(`[Asset Loader] Asset validated successfully: ${url}`);
    return true;
  } catch (error) {
    console.error(`[Asset Loader] Failed to validate asset: ${url}`, error);
    return false;
  }
}

/**
 * Logs detailed error information when a GLTF load fails
 * @param modelName - Name of the model (for logging)
 * @param path - The path that was attempted
 * @param error - The error that occurred
 */
export function logGLTFLoadError(
  modelName: string,
  path: string,
  error: any
): void {
  console.error(`[GLTF Loader] Failed to load ${modelName} model`);
  console.error(`[GLTF Loader] Path attempted: ${path}`);
  console.error(`[GLTF Loader] Error details:`, error);
  
  if (error?.message?.includes("Invalid typed array length")) {
    console.error(
      `[GLTF Loader] "Invalid typed array length" error suggests the loader received HTML/text instead of binary GLTF data.`
    );
    console.error(
      `[GLTF Loader] This typically means:`
    );
    console.error(`  1. The file doesn't exist at the specified path`);
    console.error(`  2. The server returned a 404 page (HTML) instead of the GLTF file`);
    console.error(`  3. The file path is incorrect`);
    console.error(
      `[GLTF Loader] Please verify the file exists in the public/assets folder and is deployed to Vercel`
    );
  }
}
