function ToDoItem({ what, when, who, completed }) {
    this.what = what;
    this.when = when;
    this.who = who;
    this.completed = typeof completed === 'boolean' ? completed : false;
}

document.addEventListener('DOMContentLoaded', function () {

    /**
     * Add a row to the table.
     * @param {ToDoItem} item To do item
     */
    function addTableRow(item) {
        const tr = document.createElement('tr');
        tr.innerHTML = /*html*/ `
            <td>${item.what}</td>
            <td>${item.when}</td>
            <td>${item.who}</td>
            <td><input type="checkbox"></td>`;
        /**
         * @type HTMLInputElement
         */
        const checkbox = tr.querySelector('input[type=checkbox]');
        checkbox.addEventListener('change', function () {
            tr.classList[this.checked ? 'add' : 'remove']('completed');
        });
        document.querySelector('tbody').appendChild(tr);
    }

    // #region Restore the list from local storage.
    const itemsJson = localStorage.getItem('todo');
    /**
     * @type [{ what: string, when: string, who: string, completed: bool }]
     */
    const itemsPojos = itemsJson ? JSON.parse(itemsJson) : [];
    const items = itemsPojos.map((pojo) => new ToDoItem(pojo));
    items.forEach(addTableRow)
    // #endregion

    /**
     * @type HTMLInputElement
     */
    const inputWhat = document.getElementById('what');

    /**
     * @type HTMLInputElement
     */
    const inputWhen = document.getElementById('when');

    /**
     * @type HTMLInputElement
     */
    const inputWho = document.getElementById('who');

    document.querySelector('form').addEventListener('submit', function (ev) {
        ev.preventDefault();
        const item = new ToDoItem({
            what: inputWhat.value,
            when: inputWhen.value,
            who: inputWho.value,
        });
        inputWhat.value = inputWhen.value = inputWho.value = '';
        inputWhat.focus();
        addTableRow(item);
        items.push(item);
        localStorage.setItem('todo', JSON.stringify(items));
    });
});
