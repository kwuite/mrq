import datetime
import os

SCHEDULER_TASKS = [
    {
        "path": "tests.tasks.general.MongoInsert",
        "params": {
            "a": 1
        },
        "dailytime": datetime.datetime.fromtimestamp(float(os.environ.get("MRQ_TEST_SCHEDULER_TIME"))).time()
    },
]

SCHEDULER_INTERVAL = 1
