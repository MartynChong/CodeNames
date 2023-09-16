//prettier-ignore
const determinePfp = (num: number) => {
    switch (num){
      case 0:
        return ("src/resources/pfps/spongebob.png")
        break;
      case 1:
        return ("src/resources/pfps/squidward.jpg")
        break;
      case 2:
        return ("src/resources/pfps/gary.jpg")
        break;
      case 3:
          return ("src/resources/pfps/patrick.jpg")
          break;
      case 4:
        return ("src/resources/pfps/plankton.jpg")
        break;
      case 5:
        return ("src/resources/pfps/sandy.jpg")
        break;
      case 6:
        return ("src/resources/pfps/mrspuff.jpg")
        break;
      case 7:
        return ("src/resources/pfps/mrkrabs.jpg")
        break;    
    }
  }

export default determinePfp;
