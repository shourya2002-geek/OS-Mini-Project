import { floor } from "lodash";


export function FIFO(referenceString, frameNumber) {
    let pageInMem = [];
    let pageFaults = [];
    let pageInMemArray = [];
    let pageNotInMem = [];
    let pageNotInMemArray = [];
    let referenceMapArray = [];

    
    for (let i = 0; i < referenceString.length; i++) {
        //If the frames include the string, no page fault
        if (pageInMem.includes(referenceString[i])) {
            pageFaults.push('H');
        } else {
            //Page fault occurs
            pageFaults.push('F');
            //If there is free frame
            if (pageInMem.length < frameNumber) {
                //add to the top of the array
                pageInMem.unshift(referenceString[i]);
            } else {
                if (pageNotInMem.length >= frameNumber) {
                    pageNotInMem.pop();
                }
                pageNotInMem.unshift(pageInMem.pop());
                //insert the new page into the top of the array
                pageInMem.unshift(referenceString[i]);
            }
        }
        pageInMemArray.push([...pageInMem]);
        pageNotInMemArray.push([...pageNotInMem]);
    }

    return { pageInMemArray, pageFaults, pageNotInMemArray, referenceMapArray };
}

export function LRU(referenceString, frameNumber) {
    let pageInMem = [];
    let pageFaults = [];
    let pageInMemArray = [];
    let pageNotInMem = [];
    let pageNotInMemArray = [];
    let referenceMapArray = [];
    for (let i = 0; i < referenceString.length; i++) {
        if (pageInMem.includes(referenceString[i])) {
            pageFaults.push('H');
            pageInMem.splice(pageInMem.indexOf(referenceString[i]), 1);
            pageInMem.unshift(referenceString[i]);
        }
        else {
            pageFaults.push('F');
            if (pageInMem.length < frameNumber) {
                pageInMem.unshift(referenceString[i]);
            }
            else {
                if (pageNotInMem.length >= frameNumber) {
                    pageNotInMem.pop();
                }
                pageNotInMem.unshift(pageInMem.pop());
                pageInMem.unshift(referenceString[i]);
            }
        }
        pageInMemArray.push([...pageInMem]);
        pageNotInMemArray.push([...pageNotInMem]);
    }
  
    return { pageInMemArray, pageFaults, pageNotInMemArray, referenceMapArray };
}


export function LFU(referenceString, frameNumber) {
    let pageInMem = [];
    let pageFaults = [];
    let pageInMemArray = [];
    let frequentMap = new Map();
    let pageNotInMem = [];
    let pageNotInMemArray = [];
    let referenceMapArray = [];
    referenceString.forEach((e) => frequentMap.set(e, 0));                                 //initialize counter as 0
    for (let i = 0; i < referenceString.length; i++) {
        if (pageInMem.includes(referenceString[i])) {
            pageFaults.push('H');
            frequentMap.set(referenceString[i], frequentMap.get(referenceString[i]) + 1);  //increment counter
        }
        else {
            pageFaults.push('F');
            if (pageInMem.length < frameNumber) {
                pageInMem.unshift(referenceString[i]);
            }
            else {
                //page replacement algorithm here
                let lowestCount = frequentMap.get(pageInMem[frameNumber - 1]);
                let lowestCountHolder = pageInMem[frameNumber - 1];
                for (let count = frameNumber - 2; count >= 0; count--) {                     //find out the lowest count (victim)
                    if (frequentMap.get(pageInMem[count]) < lowestCount) {
                        lowestCount = frequentMap.get(pageInMem[count]);
                        lowestCountHolder = pageInMem[count];
                    }
                }
                if (pageNotInMem.length >= frameNumber) {
                    pageNotInMem.pop();
                }
                pageNotInMem.unshift(pageInMem.splice(pageInMem.indexOf(lowestCountHolder), 1)[0]);    //replace the lowest count
                pageInMem.unshift(referenceString[i]);
            }
        }
        referenceMapArray.push(new Map(frequentMap));
        pageInMemArray.push([...pageInMem]);
        pageNotInMemArray.push([...pageNotInMem]);
    }
 
    return { pageInMemArray, pageFaults, pageNotInMemArray, referenceMapArray };
}