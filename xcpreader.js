
var FS = require("fs")


let Symbles = [
    '{',
    '}',
    '(',
    ')'
]

var DecodePart = function(start, end, type) {
    this.start = start
    this.end = end
    this.chindren = []
}

var CharSet = function(char, position) {
    this.char = char
    this.position = position

    this.paires = {
        "{":"}",
        "(":")"
    }

    this.paired = function(set) {
        return this.paires[this.char] == set.char
    }
}

var Decoder = function(str) {

    this.position = 0
    this.content = str

    this.nextSymble = function(start) {
        var end = start
        while (end < this.content.length) {
            var char = this.content[end]
            if (Symbles.includes(char)) {
                return new CharSet(char, end)
            }
            end ++
        }
        return null
    }

    this.stack = []

    this.read = function(index) {

        var set = this.nextSymble(index)
        //console.log(index)
        // var stack = [set]
        this.stack.push(set)
        var part = new DecodePart()
        part.start = set.position
        part.end = set.position

        while (this.stack.length != 0) {
            var next = this.nextSymble(part.end + 1)
            part.end = next.position
            if (!set.paired(next)) {
                if (set.char == "{" || set.char == "(") {
                    part.chindren.push(this.read(next.position))
                }
                //console.log(part.chindren)
                this.stack.push(next)
            } else {
                this.stack.pop()
            }
        }
        return part
    }
}

let file = FS.readFileSync('testcase.txt', {encoding: 'utf-8'})
let decoder = new Decoder(file)
let part = decoder.read(0)
console.log(part)
// console.log(file.substring(3, 10)) 

// while(decoder.position < decoder.str.length) {
//     console.log(decoder.nextSymble()) 
// }
// console.log(file)