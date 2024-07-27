window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    let triggerPosition = 300; // Adjust this to your desired scroll position
    let desktopLinks = document.querySelectorAll('.desktopLinks');

    if (scrollPosition >= triggerPosition) {
        document.getElementById('headerDesktop').classList.add('bg-gray-4', 'shadow-lg');
        document.getElementById('contactButton').classList.add('bg-gray-1', 'text-gray-4');
        document.getElementById('contactButton').classList.remove('bg-gray-4', 'text-gray-1');
        document.getElementById('headerDesktopLogo').src = 'media/svgs/black-logo.svg';
        document.getElementById('openMenuButton').classList.add('text-gray-1');
        document.getElementById('openMenuButton').classList.remove('text-gray-4');
        desktopLinks.forEach(function(element) {
            element.classList.add('text-gray-1');
            element.classList.remove('text-gray-4');
        });
    } else {
        document.getElementById('headerDesktop').classList.remove('bg-gray-4', 'shadow-lg');
        document.getElementById('contactButton').classList.remove('bg-gray-1', 'text-gray-4');
        document.getElementById('contactButton').classList.add('bg-gray-4', 'text-gray-1');
        document.getElementById('headerDesktopLogo').src = 'media/svgs/white-logo.svg';
        document.getElementById('openMenuButton').classList.remove('text-gray-1');
        document.getElementById('openMenuButton').classList.add('text-gray-4');
        desktopLinks.forEach(function(element) {
            element.classList.remove('text-gray-1');
            element.classList.add('text-gray-4');
        });
    }
});

/**
 * Fetch and load components into specified element IDs.
 *
 * @param {Array} components - An array of component objects with 'name' and 'elementId' properties.
 * @returns {void}
 */
const fetchComponents = (components) => {
    components.forEach((component) => {
      const { name, elementId } = component;
      fetch(`components/${name}.html`)
        .then((response) => response.text())
        .then((data) => {
          const element = document.getElementById(elementId);
          if (element) {
            element.innerHTML = data;
          }
        });
    });
  };


/**
 * Fetches all the data from the JSON file.
 *
 * @returns {void}
 */
const fetchData = () => {
    return {
        data: {},
        scroll: false,
        loadData() {
            fetch('data.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(json => {
                    this.data = json;
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }
    };
  }


/**
 * Extracts the value of the 'project' URL parameter from the current window's URL.
 *
 * @returns {string} The value of the 'project' URL parameter if found.
 */
const getProjectFromURL = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('project');
}

/**
 * Fetches the project from the JSON file, according to the URL parameter.
 *
 * @returns {void}
 */
const fetchProject = () => {
    return {
        projectFound: null,
        urlId: null,
        projects: {},
        project: {},
        loadData() {
            fetch('data.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(json => {
                    this.urlId = getProjectFromURL();
                    this.projects = json.projects;
                    this.project = this.projects.find(project => project.id === this.urlId);
                    if (this.project) {
                      this.projectFound = true;
                    } else {
                      this.projectFound = false;
                    }
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                    this.loading = false;
                });
        }
    };
  }

  const setMark = (id) => {
    let marks = document.querySelectorAll('.linkMarks');
    marks.forEach(link => {
        link.classList.remove('inline');
        link.classList.add('hidden');
    });

    console.log(id)
    document.getElementById(id).classList.remove('hidden');
    document.getElementById(id).classList.add('inline');
  }