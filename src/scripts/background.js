import { nanoid } from "nanoid";
import ext from "./utils/ext";
import storage from "./utils/storage";
import { JSONToParse, setSignSync, setSignMapSync, getSignSync, getSignAndMapSync, judgeToRepeat } from "./utils/utils";

// storage.clear()

async function initSign() {
  console.log('storage: ', storage)
  const signValue = [
    {
      id: '001',
      name: '默认书签',
      list: [],
      type: 'folder'
    }
  ]
  const signMapValue = { '001': 0 }
  const { sign, signMap } = await getSignAndMapSync()
  
  if (!sign || (Array.isArray(sign) && sign.length === 0)) {
    await setSignSync(signValue)
  }
  
  if (!signMap || (JSON.stringify(signMap) === '{}')) {
    await setSignMapSync(signMapValue)
  }
}

ext.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    if(request.action === "perform-save") {
      console.log("Extension Type: ", "/* @echo extension */");
      console.log("PERFORM AJAX", JSON.parse(request.data));

      if (request.data) {
        const reqData = JSONToParse(request.data)

        // const sign = await getSignSync()
        getSignSync().then(sign => {
          try {
            const isRepeat = judgeToRepeat(sign[0].list, reqData)
            
            // 得知有重复数据
            if (isRepeat) return
  
            reqData.id = nanoid()
            sign[0].list.push(reqData) // 0 => 目前默认往默认文件夹放数据
  
            setSignSync(sign)
          } catch (error) {
            // await initSign()
            initSign().then(() => {
              reqData.id = nanoid()
              sign[0].list.push(reqData) // 0 => 目前默认往默认文件夹放数据
    
              setSignSync(sign)
            })
          }
        })

        sendResponse({ action: "saved" });
      }

    }
  }
);

initSign()