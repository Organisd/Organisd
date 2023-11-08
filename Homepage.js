var defaultStorage = {
    hasTimetable: false,
    hasTasks: false,
    isUser: false,
    username: "",
    password: ""
}

class LocalHome {

    get fullStorage() {
        const STORAGE_NAME = "organisd_data";
        let STORAGE = localStorage.getItem(STORAGE_NAME);

        if (STORAGE == {} || !STORAGE) {
            STORAGE = {
                home : {

                }
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
            STORAGE = "{}";
        };

        //Parse and Return JSON
        const PARSED = JSON.parse(STORAGE);

          //Check Storage
        if (PARSED?.home == undefined) {
            PARSED.home = defaultStorage;
        }

        return PARSED.home;

    }

    Set(DATA) {
        //Convert Data Object to Stringified Json Data
        const FULLSTORAGE = this.fullStorage;
        FULLSTORAGE.home = DATA;
        const STRINGIFIED = JSON.stringify(FULLSTORAGE);
        const STORAGE_NAME = "organisd_data";

        //Set Storage
        localStorage.setItem(STORAGE_NAME,STRINGIFIED);

    }

}

function showTimetableWarning() {
    $("div.homeTimetableWarn")[0].style.display = "";
    $("#timetableWarnClose")[0].addEventListener("click",function() {
        $("#homeTimetableWarnBox")[0].classList.add("hidden");
        window.setTimeout(function() {
            $("#homeTimetableWarnBox")[0].style.height = "0px";
        },500)
    });
}

function showAccountWarning() {
    $("div.homeAccountWarn")[0].style.display = "";
    $("#accWarnClose")[0].addEventListener("click",function() {
        $("#homeAccountWarnBox")[0].classList.add("hidden");
        window.setTimeout(function() {
            $("#homeAccountWarnBox")[0].style.height = "0px";
        },500)
    });
}

function showTaskInfo() {
    $("div.homeTasksInfo")[0].style.display = "";
    $("#taskInfoClose")[0].addEventListener("click",function() {
        $("#homeTasksInfoBox")[0].classList.add("hidden");
        window.setTimeout(function() {
            $("#homeTasksInfoBox")[0].style.height = "0px";
        },500)
    });
}

class Homepage {
    constructor() {

        var homeStorage = new LocalHome();
        var local = homeStorage.Storage;

        if (local.hasTimetable === false) {
            showTimetableWarning();
        }

        if (local.isUser === false) {
            showAccountWarning();
        }

        if (local.hasTasks === false) {
            showTaskInfo();
        }

    }
}

new Homepage();