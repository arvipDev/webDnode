const fs = require('fs');

// -----This is the blocking, synchronous way
// const input = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(input);
// // `` is the Template string from ES6, we can use dynamic syntax to include js within a string.
// // We can use string and + operator as well.
// const output = `Some text I want to write to the file system: ${input} .\n created on: ${Date.now}`;
// fs.writeFileSync('./txt/output.txt', output);

//This is the asynchronous, non-blocking way
//Note the triangular space indentation on the left, it is called callback hell.
//There is a way to make the process asynchoronous without using callback/causing callback hell.
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
    if(err) return console.log('Error!!!');
    fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt','utf-8',(err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt',`${data2}.\n${data3}` ,'utf-8',(err, data4) => {
                console.log("File successfully written");
            })
        })
    });
});
console.log('Reading file...');