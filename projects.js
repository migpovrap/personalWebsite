async function fetchPinnedProjects() {
  try {
    const response = await fetch('https://pinned.berrysauce.dev/get/migpovrap');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched data:', data); // Debug log

    const projectsContainer = document.querySelector('#projects .grid');
    if (!projectsContainer) {
      console.error('Could not find projects container');
      return;
    }

    projectsContainer.innerHTML = ''; // Clear existing content

    if (!data || data.length === 0) {
      projectsContainer.innerHTML = `
              <div class="col-span-3 text-center text-zinc-600">
                  No pinned repositories found. Please pin some repositories on GitHub.
              </div>
          `;
      return;
    }

    data.forEach(project => {
      if (!project) return;

      projectsContainer.innerHTML += `
              <div class="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 bg-white dark:bg-zinc-800">
                  <a href="https://github.com/${project.author}/${project.name}" target="_blank" class="block">
                      <div class="p-6 bg-white dark:bg-zinc-800">
                          <div class="flex items-center justify-between mb-4">
                              <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100">${project.name}</h3>
                              <i class="fab fa-github text-xl text-zinc-700 dark:text-zinc-300"></i>
                          </div>
                          <p class="text-zinc-600 dark:text-zinc-400 mb-4">
                              ${project.description || 'No description available'}
                          </p>
                          <div class="flex flex-wrap gap-2">
                              <span class="px-3 py-1 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-700 rounded-full">
                                  ${project.language}
                              </span>
                              <span class="px-3 py-1 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-700 rounded-full">
                                  ⭐ ${project.stars}
                              </span>
                              <span class="px-3 py-1 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-700 rounded-full">
                                  🍴 ${project.forks}
                              </span>
                          </div>
                      </div>
                  </a>
              </div>
          `;
    });
  } catch (error) {
    console.error('Error fetching pinned projects:', error);
    const projectsContainer = document.querySelector('#projects .grid');
    projectsContainer.innerHTML = `
          <div class="col-span-3 text-center text-zinc-600">
              Unable to load projects. Please try again later.
          </div>
      `;
  }
}

document.addEventListener('DOMContentLoaded', fetchPinnedProjects);