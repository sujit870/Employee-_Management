document.addEventListener('DOMContentLoaded', function () {
    const employeeTable = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const departmentSelect = document.getElementById('department');
    const genderSelect = document.getElementById('gender');
    const orderSelect = document.getElementById('order');
    let currentPage = 1;
  
    // Function to fetch employees data from API based on current filters, sort, and pagination
    function fetchEmployees() {
      const url = constructURL();
      fetch(url)
        .then(response => response.json())
        .then(data => {
          renderTable(data.data);
        })
        .catch(error => console.error('Error fetching employees:', error));
    }
  
    // Function to construct URL based on current filters, sort, and pagination
    function constructURL() {
      const baseUrl = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees';
      const queryParams = [];
      if (currentPage) {
        queryParams.push(`page=${currentPage}`);
      }
      if (departmentSelect.value) {
        queryParams.push(`filterBy=department&filterValue=${departmentSelect.value}`);
      }
      if (genderSelect.value) {
        queryParams.push(`filterBy=gender&filterValue=${genderSelect.value}`);
      }
      if (orderSelect.value) {
        queryParams.push(`sort=salary&order=${orderSelect.value}`);
      }
      return `${baseUrl}?${queryParams.join('&')}`;
    }
  
    // Function to render employees data in the table
    function renderTable(data) {
      employeeTable.innerHTML = '';
      data.forEach((employee, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${employee.name}</td>
            <td>${employee.gender}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
          </tr>
        `;
        employeeTable.insertAdjacentHTML('beforeend', row);
      });
    }
  
    // Event listener for department, gender, and order select changes
    [departmentSelect, genderSelect, orderSelect].forEach(select => {
      select.addEventListener('change', fetchEmployees);
    });
  
    // Event listener for previous page button
    prevPageBtn.addEventListener('click', function () {
      if (currentPage > 1) {
        currentPage--;
        currentPageSpan.textContent = currentPage;
        fetchEmployees();
      }
    });
  
    // Event listener for next page button
    nextPageBtn.addEventListener('click', function () {
      currentPage++;
      currentPageSpan.textContent = currentPage;
      fetchEmployees();
    });
  
    // Initial fetch
    fetchEmployees();
  });