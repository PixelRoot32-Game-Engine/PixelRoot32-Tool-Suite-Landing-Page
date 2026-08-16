/**
 * Version Utility
 * Fetches the latest tag version from GitHub Tool Suite Releases
 */

const GITHUB_API_URL = 'https://api.github.com/repos/PixelRoot32-Game-Engine/PixelRoot32-Tool-Suite-Releases/tags';
const FALLBACK_VERSION = 'v1.1.0';

let cachedVersion: string | null = null;

/**
 * Get the latest version from GitHub tags
 * Falls back to cached version or default if API fails
 */
export async function getLatestVersion(): Promise<string> {
  // Return cached version if available
  if (cachedVersion) {
    return cachedVersion;
  }

  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const tags = await response.json();
    
    // Get the first tag (tags are sorted by creation date, most recent first)
    if (Array.isArray(tags) && tags.length > 0) {
      // Sort tags by semantic version to ensure we get the true latest version
      tags.sort((a: any, b: any) => compareVersions(a.name, b.name));

      const latestTag = tags[0];
      const version = latestTag.name || FALLBACK_VERSION;
      
      // Cache the version
      cachedVersion = version;
      
      return version;
    }
    
    return FALLBACK_VERSION;
  } catch (error) {
    console.warn('Failed to fetch latest version from GitHub:', error);
    return FALLBACK_VERSION;
  }
}

/**
 * Helper to parse version string into components
 */
function parseVersion(version: string) {
  const clean = version.replace(/^v/, '');
  const [core, pre] = clean.split('-');
  const parts = core.split('.').map(Number);
  return { parts, pre };
}

/**
 * Helper to compare two version strings
 * Returns negative if A > B (for descending sort)
 */
function compareVersions(verA: string, verB: string) {
  if (!verA) return 1;
  if (!verB) return -1;
  
  const vA = parseVersion(verA);
  const vB = parseVersion(verB);

  // Compare major, minor, patch
  for (let i = 0; i < 3; i++) {
    const partA = vA.parts[i] || 0;
    const partB = vB.parts[i] || 0;
    if (partA !== partB) return partB - partA; // Descending
  }

  // If core versions are equal, handle pre-release
  // Release (no pre) > Pre-release
  if (!vA.pre && vB.pre) return -1; // A is newer
  if (vA.pre && !vB.pre) return 1;  // B is newer
  
  // If both have pre-release, compare alphabetically
  if (vA.pre && vB.pre) {
    return vA.pre.localeCompare(vB.pre) * -1;
  }
  
  return 0;
}

/**
 * Initialize version display
 * Updates the version badges in the page
 */
export async function initVersionDisplay(i18n?: { t: (key: string, defaultValue?: string) => string }, container: HTMLElement = document.body): Promise<void> {
  // Update hero version badge if it exists
  const heroVersionElement = container.querySelector('#hero-version');
  if (heroVersionElement) {
    try {
      const version = await getLatestVersion();
      const availableText = i18n?.t('hero.version.available', 'available') || 'available';
      heroVersionElement.textContent = `${version} ${availableText}`;
    } catch (error) {
      console.warn('Failed to update hero version display:', error);
    }
  }

  // Update download section version badge if it exists
  const downloadVersionElement = container.querySelector('#download-version');
  if (downloadVersionElement) {
    try {
      const version = await getLatestVersion();
      downloadVersionElement.textContent = version;
    } catch (error) {
      console.warn('Failed to update download version display:', error);
    }
  }
}
