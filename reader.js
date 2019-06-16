document.querySelector("#start-recording").disabled = true
document.querySelector("#stop-recording").disabled = true

let headsetDevice
let headsetTransferPromise
let headsetData

async function headsetConnect() {
  let connected = false
  try {
    headsetDevice = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x15ba }, { vendorId: 0x05ac }] })
    console.log("Device: " + headsetDevice.productName)
    console.log("Manufacturer: " + headsetDevice.manufacturerName)
    connected = true
  } catch (error) {
    console.log(error)
  }

  if (connected) {
    document.querySelector("#start-recording").disabled = false
    document.querySelector("#stop-recording").disabled = false
    document.querySelector("#connection-status").textContent = "✅👌"
  }
}

async function startRecording() {
  console.log("startRecording")
  let buffer = new ArrayBuffer(17)
  console.log(arrayBuffer)
  headsetTransferPromise = await headsetDevice.isochronousTransferOut(1, headsetData, buffer)
}

function stopRecording() {
  console.log("stopRecording")
  let transferResult = headsetTransferPromise.resolve()
  console.log("transferResult: " + transferResult)
  console.log("transferData: " + headsetData)
}
