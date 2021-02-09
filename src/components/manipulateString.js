function manipulateString(item) {
    item = item.replaceAll("state(", "");
    item = item.replaceAll("agent(", "");
    item = item.replaceAll("agents(", "");
    item = item.replaceAll("~)", "");
    if(item.startsWith("(") && item.endsWith(")")){
        item = item.substring(1);
        item = item.slice(0,-1);
    }
    if(item.endsWith("*")){
        item = item.slice(0,-1);
    }
    return item;
}

export default manipulateString;