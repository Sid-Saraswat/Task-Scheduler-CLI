const fs = require("fs");

const dirs = () => {
    const path1 = "./task.txt";
    const path2 = "./completed.txt";
    if (!fs.existsSync(path1)) {
        fs.writeFile('task.txt', "", (err) => {
            if (err) throw err;
        });
    }
    if (!fs.existsSync(path2)) {
        fs.writeFile('completed.txt', "", (err) => {
            if (err) throw err;
        });
    }
}

function isEmpty(str) {
    return (!str || str.length === 0);
}

const errorMessage = () => {
    console.log("Invalid Syntax...!!!");
    help();
}

const help = () => {
    let help = `./task help                  # show usage
./task add 2 "hello world"   # Add a new item with priority 2 and text "hello world" to the list of tasks
./task ls                    # Show incomplete priority list items sorted by priority in ascending order
./task del NUMBER            # Delete the incomplete item with the given priority number
./task done NUMBER           # Mark the incomplete item with the given priority number as completed
./task report                # Stastiscs`
    console.log("USAGE :");
    console.log(help);
}

const add = (prt, txt) => {
    let arr = []
    let task = {
        prt,
        txt
    }
    arr.push(task);
    dirs();
    if (isEmpty(txt)) {
        errorMessage();
    }
    fs.readFile('task.txt', 'utf8', function (err, data) {
        if (data.length == "") {
            fs.writeFile('task.txt', `\n ${JSON.stringify(arr)}`, (err) => {
                if (err) throw err;
                console.log('The task was successfully added..!!!');
            });
        } else {
            let f = 0;
            JSON.parse(data).forEach(element => {
                if (element.prt == prt) {
                    f = f + 1;
                }
                arr.push(element);
            })
            if (f === 0) {
                let text = arr.sort(function (a, b) {
                    return a.prt - b.prt
                });
                fs.writeFile('task.txt', `\n ${JSON.stringify(text)}`, (err) => {
                    if (err) throw err;
                    console.log('The task was successfully added..!!!');
                });
            } else {
                console.log("Priority Already Added  ..!!!")
            }
        }
    })
}

const del = (prt) => {
    dirs();
    fs.readFile('task.txt', 'utf8', function (err, data) {
        if (prt > JSON.parse(data).length) {
            console.log('Task Does not Exists')
        } else {
            if (data == "") {
                console.log("No Tasks Yet To Delete...!!")
            } else {
                let arr1 = JSON.parse(data)
                arr1.splice(prt - 1, 1)
                fs.writeFileSync('task.txt', `\n ${JSON.stringify(arr1)}`, (err) => {
                    if (err) throw err;
                    console.log("Task Deleted Succesfully..!!");
                });
            }
        }
    })
}

const ls = () => {
    dirs();
    fs.readFile('task.txt', 'utf8', function (err, data) {
        if (data == "") {
            console.log("No Tasks Yet To Show...!!")
        } else {
            let a = 1;
            JSON.parse(data).forEach((e) => {
                console.log(`${a}. ${e.txt} [${e.prt}]`);
                a++;
            })
        }
    })
}

const done = (prt) => {
    dirs();
    fs.readFile('task.txt', 'utf8', function (err, data1) {
        if (err) throw err;
        if (prt > JSON.parse(data1).length) {
            console.log('Task Does not Exists')
        } else {
            if (data1 == "") {
                console.log("No Tasks Yet to be Done..!!")
            } if (JSON.parse(data1).length == 0) {
                console.log("No Tasks Yet to be Done..!!")
            } else {
                let arr = []
                const done = JSON.parse(data1)[prt - 1];
                arr.push(done)
                let arr1 = JSON.parse(data1)
                arr1.splice(prt - 1, 1)
                fs.readFile('completed.txt', 'utf8', function (err, data) {
                    if (err) throw err;
                    if (data == "") {
                        fs.writeFileSync('task.txt', `\n ${JSON.stringify(arr1)}`, (err) => {
                            if (err) throw err;
                        });
                        fs.writeFile('completed.txt', `\n ${JSON.stringify(arr)}`, (err) => {
                            if (err) throw err;
                            console.log('The task was successfully Done.!!!');
                        });
                    } else {
                        JSON.parse(data).forEach(element => {
                            arr.push(element);
                        })
                        let text = arr.sort(function (a, b) {
                            return a.prt - b.prt
                        });
                        fs.writeFileSync('task.txt', `\n ${JSON.stringify(arr1)}`, (err) => {
                            if (err) throw err;
                        });
                        fs.writeFile('completed.txt', `\n ${JSON.stringify(text)}`, (err) => {
                            if (err) throw err;
                            console.log('The task was successfully Done.!!!');
                        });
                    }
                })
            }
        }
    })
}

const report = () => {
    dirs();
    fs.readFile('task.txt', 'utf8', function (err, data) {
        if (err) throw err;
        if (data == "") {
            console.log(`\nPending: 0`)
            console.log("No Tasks Yet...!!")
        } else {
            console.log(`\nPending: ${JSON.parse(data).length}`)
            let a = 1;
            JSON.parse(data).forEach((e) => {
                console.log(`${a}. ${e.txt} [${e.prt}]`);
                a++;
            })
        }
    })
    fs.readFile('completed.txt', 'utf8', function (err, data) {
        if (err) throw err;
        if (data == "") {
            console.log(`\nCompleted: 0`)
            console.log("No Tasks Yet...!!")
            console.log("\n")
        } else {
            console.log(`\nCompleted: ${JSON.parse(data).length}`)
            let a = 1;
            JSON.parse(data).forEach((e) => {
                console.log(`${a}. ${e.txt} [${e.prt}]`);
                a++;
            })
            console.log("\n")
        }
    })
}

if (process.argv.length <= 2) {
    help();
} else if (process.argv[2] == 'ls') {
    if (process.argv.length > 3) {
        errorMessage();
    } else {
        ls();
    }
} else if (process.argv[2] == 'add') {
    if (process.argv.length == 5) {
        add(process.argv[3], process.argv[4]);
    } else {
        errorMessage();
    }
} else if (process.argv[2] == 'del') {
    if (process.argv.length == 4) {
        del(process.argv[3]);
    } else {
        errorMessage();
    }
} else if (process.argv[2] == 'done') {
    if (process.argv.length == 4) {
        done(process.argv[3]);
    } else {
        errorMessage();
    }
} else if (process.argv[2] == 'report') {
    if (process.argv.length > 3) {
        errorMessage();
    } else {
        report();
    }
} else if (process.argv[2] == 'help') {
    if (process.argv.length > 3) {
        errorMessage();
    } else {
        help();
    }
} else {
    help();
}

// code by : - Siddharth Saraswat
// email : - siddharthsaraswat73@gmail.com