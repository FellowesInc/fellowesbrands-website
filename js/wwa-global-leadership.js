const globalDropDownMenu = document.querySelector('.global-dropdown-menu');
const navLinks = globalDropDownMenu.querySelectorAll('.global-leadership-tabs .dropdown-item[data-mdb-toggle="tab"]');
const dropdownButton = globalDropDownMenu.querySelector('.global-leadership-tabs .dropdown-toggle[data-mdb-toggle="dropdown"');


document.addEventListener('DOMContentLoaded', () => {
    navLinks.forEach(link => link.addEventListener('click', function (event) {
        dropdownButton.textContent = this.textContent;
        dropdownButton.click();
    }))
})
