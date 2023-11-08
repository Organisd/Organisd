(function() {
    $("[data-page='tasks'][data-type='page']")[0].innerHTML = "";

    const storageTasksDefault = {
        list : [],
        theme: ""
    }

    class LocalTasks {

        get fullStorage() {
            const STORAGE_NAME = "organisd_data";
            let STORAGE = localStorage.getItem(STORAGE_NAME);

            if (STORAGE == {} || !STORAGE) {
                STORAGE = {
                    tasks : storageTasksDefault
                };
                STORAGE = JSON.stringify(STORAGE);
            }

            const PARSED = JSON.parse(STORAGE);
            return PARSED;
        }

        get Storage() {

            //get storage
            const STORAGE_NAME = "organisd_data";
            let STORAGE = localStorage.getItem(STORAGE_NAME);

            if (!STORAGE) {
                STORAGE = {
                    tasks : storageTasksDefault
                };
                STORAGE = JSON.stringify(STORAGE);
            };

            //Parse and Return JSON
            const PARSED = JSON.parse(STORAGE);

            //Check Storage
            if (PARSED?.tasks == undefined) {
                PARSED.tasks = storageTasksDefault;
            }

            return PARSED.tasks;

        }

        Set(DATA) {
            //Convert Data Object to Stringified Json Data
            const FULLSTORAGE = this.fullStorage;
            FULLSTORAGE.tasks = DATA;
            const STRINGIFIED = JSON.stringify(FULLSTORAGE);
            const STORAGE_NAME = "organisd_data";

            //Set Storage
            localStorage.setItem(STORAGE_NAME,STRINGIFIED);

        }

    }



    function LOAD_ALL_TASKS( ARRAY ) {

        function LOAD_TASK(TASK_OBJ, TASK_INDEX, TASK_ARRAY) {

            var TITLE = String(TASK_OBJ.title);
            var SUBJECT = String(TASK_OBJ.subject);
            var DATE = String(TASK_OBJ.date);
            var BACKGROUND = Number(TASK_OBJ.background) != NaN ? Number(TASK_OBJ.background) : null;

            var TASK_HTML = `<div class="task" data-bg="${BACKGROUND}">
                                <div class="taskTop">
                                    <span class="taskTitle">${TITLE}</span>
                                    <span class="taskSubject">${SUBJECT}</span>
                                </div>

                                <span class="taskDate">${DATE}</span>
                                <img class="taskClose" src="icons/xmark-solid.svg">
            </div>`;
            
            var element = document.createElement("div");
            $("[data-page='tasks'][data-type='page']")[0].append(element);
            element.outerHTML = TASK_HTML;

            var storage_tasks = new LocalTasks();
            var storage = storage_tasks.Storage;

            $("div.task").each(function() {
                var index = TASK_HTML == this.outerHTML ? $("div.task").index(this) : -1;
                $(this).find(".taskClose")[0].addEventListener("click",function() {
                    storage.list.splice(index);
                    this.parentElement.remove();
                    storage_tasks.Set(storage);
                });
            });

        }
        
        ARRAY.forEach(LOAD_TASK);

    }


    function CONVERT_ELEMENTS_TO_TASK(TITLE, DATE, SUBJECT, BACKGROUND) {
        var TITLE = String(TITLE.value);
        var DATE = String(DATE.value);
        var SUBJECT = String(SUBJECT.value);
        var BACKGROUND = String(BACKGROUND.value);

        var TASK = {
            title: TITLE,
            date: DATE,
            subject: SUBJECT,
            background: BACKGROUND
        }

        return TASK;
    }




    $("#addTask")[0].addEventListener("click",function() {
        
        var title = $("#taskTitle")[0];
        var date = $("#taskDate")[0];
        var subject = $("#taskSubject")[0];
        var background = $("#taskBg")[0];

        var taskObj = CONVERT_ELEMENTS_TO_TASK(title,date,subject,background);

        var storage = new LocalTasks();
        var local = storage.Storage;
        local.list.push(taskObj);
        LOAD_ALL_TASKS([taskObj]);

        var home = new LocalHome();
        var store = home.Storage;

        store.hasTasks = true;
        home.Set(store);

        storage.Set(local);
    });


    function loadAll() {
        var storage = new LocalTasks();
        var local = storage.Storage;
        LOAD_ALL_TASKS(local.list);
    }

    loadAll();
})()