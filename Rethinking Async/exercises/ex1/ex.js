function ShowNum1(){
	console.log('1');
}
function ShowNum2(){
	for(let i = 0; i<=1000000000000; i+=1){
        if(i=== 1000000000000) {
            console.log(i);
        }
    }
}
function ShowNum3(){
	console.log('3');
}
ShowNum1();  //dòng lệnh 1 cần thực thi
ShowNum2();  //dòng lệnh 2 cần thực thi
ShowNum3()