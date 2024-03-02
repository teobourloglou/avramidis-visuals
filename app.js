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
          loadBoxShadows();
        });
    });
  };

/**
 * Create and associate box shadows in elements.
 *
 * @returns {void}
 */
const loadBoxShadows = () => {
    let shadow = '';
    for (let i = 0; i < 400; i++) {
        shadow += (shadow? ',':'')+ -i*2+'px ' + i*1+'px 0 #d3d3d3';
    }
    document.querySelectorAll(".service-item").forEach(item => {
        item.style.boxShadow = shadow;
    });
}

/**
 * Fetches all the products from the JSON file.
 *
 * @returns {void}
 */
const fetchData = () => {
    return {
        data: {},
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