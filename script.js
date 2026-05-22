const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");
const emptyMessage = document.getElementById("emptyMessage");

let filtroAtual = "todas";

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    adicionarTarefa();
});

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        filtroAtual = button.dataset.filter;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        aplicarFiltro();
    });
});

function adicionarTarefa() {
    const textoTarefa = taskInput.value.trim();

    if (textoTarefa === "") {
        alert("Digite uma tarefa antes de adicionar.");
        taskInput.focus();
        return;
    }

    const li = document.createElement("li");
    li.classList.add("task-item");
    li.dataset.status = "pendente";

    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const span = document.createElement("span");
    span.classList.add("task-text");

    // textContent evita que tags HTML digitadas pelo usuário sejam interpretadas.
    span.textContent = textoTarefa;

    const badge = document.createElement("span");
    badge.classList.add("badge", "badge-pendente");
    badge.textContent = "Pendente";

    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.textContent = "Concluir";
    toggleBtn.classList.add("status-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Excluir";
    deleteBtn.classList.add("delete-btn");

    toggleBtn.addEventListener("click", function() {
        alternarStatus(li, badge, toggleBtn);
    });

    span.addEventListener("click", function() {
        alternarStatus(li, badge, toggleBtn);
    });

    deleteBtn.addEventListener("click", function() {
        li.remove();
        aplicarFiltro();
    });

    taskContent.appendChild(span);
    taskContent.appendChild(badge);

    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskContent);
    li.appendChild(actions);

    taskList.appendChild(li);

    taskInput.value = "";
    taskInput.focus();
    aplicarFiltro();
}

function alternarStatus(li, badge, toggleBtn) {
    const estaConcluida = li.dataset.status === "concluida";

    if (estaConcluida) {
        li.dataset.status = "pendente";
        li.classList.remove("concluida");
        badge.textContent = "Pendente";
        badge.classList.remove("badge-concluida");
        badge.classList.add("badge-pendente");
        toggleBtn.textContent = "Concluir";
    } else {
        li.dataset.status = "concluida";
        li.classList.add("concluida");
        badge.textContent = "Concluída";
        badge.classList.remove("badge-pendente");
        badge.classList.add("badge-concluida");
        toggleBtn.textContent = "Reabrir";
    }

    aplicarFiltro();
}

function aplicarFiltro() {
    const tarefas = document.querySelectorAll(".task-item");
    let tarefasVisiveis = 0;

    tarefas.forEach(function(tarefa) {
        const status = tarefa.dataset.status;
        const deveMostrar =
            filtroAtual === "todas" ||
            (filtroAtual === "pendentes" && status === "pendente") ||
            (filtroAtual === "concluidas" && status === "concluida");

        tarefa.classList.toggle("hidden", !deveMostrar);

        if (deveMostrar) {
            tarefasVisiveis++;
        }
    });

    emptyMessage.classList.toggle("show", tarefasVisiveis === 0);
}
