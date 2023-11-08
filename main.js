class Home {
    constructor() {
        var homepage = $("[data-page='home'][data-type='page']")[0];
        var newScript = document.createElement("script");
        newScript.src="Homepage.js";
        newScript.id = "homepageScript";
        
        if ($("#homepageScript")[0]) {
            return;
        }
        homepage.append(newScript);
    }
}

class TasksPage {
    constructor() {
        var tasks = $("[data-page='tasks'][data-type='page']")[0];
        var newScript = document.createElement("script");
        newScript.src="Tasks.js";
        newScript.id = "tasksScript";
        
        if($("#tasksScript")[0]) {
            return true;
        }

        tasks.append(newScript);
    }
}

class TimetablePage {
    constructor() {
        var timetable = $("[data-page='timetable'][data-type='page']")[0];
        var newScript = document.createElement("script");
        newScript.src="Timetable.js";
        newScript.id = "timetableScript";
        
        if($("#timetableScript")[0]) {
            return true;
        }

        timetable.append(newScript);
    }
}

new Home();

const ERR_codes = [
    "Not a HTMLElement Object",
    "Wrong Element"
]

class Nav {

    get NAV_BUTTONS() { return $("[data-target][data-type='navbutton']") };
    get ACTIVE_PAGE() { return $("[data-active]") };
    
    REMOVE_ACTIVE_ALL() {
        $("[data-active]").each(function() { delete this.dataset.active });
    }

    SET_ACTIVE(page) {
        if (!page instanceof HTMLElement) return ERR_codes[0];
        if (page.dataset.type != "page")    return ERR_codes[1];

        this.REMOVE_ACTIVE_ALL();

        page.dataset.active = " ";
        var target = page.dataset.page;
        $(`[data-type='panel-left'][data-page='${target}']`)[0].dataset.active = " ";
        $(`[data-type='panel-right'][data-page='${target}']`)[0].dataset.active = " ";
    }

    constructor() {
        Array.from(this.NAV_BUTTONS).forEach((button) => {
            button.addEventListener("click",(event) => {
                var clicked = event.currentTarget;
                var page = $(`[data-type='page'][data-page='${clicked.dataset.target}']`)[0];
                this.SET_ACTIVE(page);

                var target = clicked.dataset.target;
                if (target == "home"){
                    new Home();
                }
                 
                if (target == "tasks") {
                    new TasksPage();
                }

            })
        });
        
    }

}

new Nav();

class Download {
    constructor() {
        $("[data-download]").each(function(e) {
            this.addEventListener("click",function() {
                window.open(this.dataset.download);
            })
        })
    }
}

new Download();