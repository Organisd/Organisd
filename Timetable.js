(function() {

    var storageTimetableDefault = {
        preset : "",
        presets: []
    }

    class LocalTimetable {

        get fullStorage() {
            const STORAGE_NAME = "organisd_data";
            let STORAGE = localStorage.getItem(STORAGE_NAME);

            if (STORAGE == {} || !STORAGE) {
                STORAGE = {
                    timetable : storageTimetableDefault
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
                    timetable : storageTimetableDefault
                };
                STORAGE = JSON.stringify(STORAGE);
            };

            //Parse and Return JSON
            const PARSED = JSON.parse(STORAGE);

            //Check Storage
            if (PARSED?.timetable == undefined) {
                PARSED.timetable = storageTimetableDefault;
            }

            return PARSED.timetable;

        }

        Set(DATA) {
            //Convert Data Object to Stringified Json Data
            const FULLSTORAGE = this.fullStorage;
            FULLSTORAGE.timetable = DATA;
            const STRINGIFIED = JSON.stringify(FULLSTORAGE);
            const STORAGE_NAME = "organisd_data";

            //Set Storage
            localStorage.setItem(STORAGE_NAME,STRINGIFIED);

        }

    }

    

})();