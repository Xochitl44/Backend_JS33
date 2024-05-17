const number = parseFloat(process.argv[2]);


let contador = 1;
while (contador <= number) {
    if (contador % 3 === 0 && contador % 5 === 0) {
        console.log(contador + " FizzBuzz")
    } else if (contador % 3 == 0) {
        console.log(contador + " Fizz")
    } else if (contador % 5 == 0) {
        console.log(contador + " Buzz")
      } else {
        console.log(contador)
      }
      contador = contador + 1
}