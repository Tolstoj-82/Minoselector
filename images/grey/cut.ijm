var shade = newArray(0, 154, 206, 255);


imgW = getWidth();
imgH = getHeight();
imgID = getImageID();


wi = round(imgW/16);
hi = round(imgH/16);

function findClosest(median){
	min = 3000;
	ind = 0;
	for(i=0; i<lengthOf(shade); i++){
		thisDelta = abs(shade[i]-median);
		if(thisDelta < min){
			min = thisDelta;
			ind = i;
		}
	}
	return shade[ind];
}

function reshade(){
	id = getImageID();
	run("Scale...", "x=- y=- width=64 height=64 interpolation=Bilinear create");
	selectImage(id);
	close();
	w = round(getWidth()/8);
	h = round(getHeight()/8);
	for(x=0; x<8; x++){
		for(y=0; y<8; y++){
			makeRectangle(x*w+2, y*h+2, w-2, h-2);
			thisMedian = getValue("Median");			
			thisValue = findClosest(thisMedian);
			makeRectangle(x*w, y*h, w, h);
			setBackgroundColor(thisValue, thisValue, thisValue);
			run("Cut");
		}	
	}
}

for(x=0; x<16; x++){
	for(y=0; y<16; y++){
		thisName = ""+toUpperCase(toHex(y)+""+toHex(x));
		makeRectangle(wi*x, hi*y, wi, hi);
		
		run("Duplicate...", "title=" + thisName);	
		reshade();
		saveAs("png", "C://Users//marti//Desktop//minoselector//images//" + thisName + ".png");
		close();
	}
}

