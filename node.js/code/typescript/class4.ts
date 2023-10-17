class Printer {
    doPrint():void{
        console.log("父类的 doPrint()方法");
    }
}

class StringPrinter extends Printer {
    doPrint(): void {
        super.doPrint(); //调用父类的函数
        console.log("子类的doPrint()方法。");
    }
}

var printer = new StringPrinter();
printer.doPrint();