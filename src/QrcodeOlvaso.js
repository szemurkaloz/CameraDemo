/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, {useState} from 'react';
import {CameraScreen} from 'react-native-camera-kit';
import {Alert} from 'react-native';

export const QuercodeOlvaso = () => {
  const [scanning, setScanning] = useState(true);
  const [badHashFormat, setBadHashFormat] = useState(false);

  const readQRCode = obj => {
    //console.log('QR code found', JSON.stringify(obj));

    if (!scanning) {
      return;
    }

    const patt =
      '^[0-9]{4}-[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}-[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}#.+$';

    if (!obj.match(patt)) {
      setBadHashFormat(true);
      return;
    }

    setScanning(false);

    const scannedData = obj.split('#');
    let adat = {
      key: null,
      id: scannedData[0],
      paciensNev: scannedData[1],
      szulDatum: scannedData[2],
      orvos: scannedData[3],
      szerep: scannedData[4],
    };
    console.log('Beolvasott qrqode: ', adat);
    //Kulcs ismétlés keresése id === key
    /*
    keresKeyInKeys(scannedData[0]).then(value => {
      //console.log("Ismetles:", value)
      if (value === undefined) {
        let adat = {
          key: null,
          id: scannedData[0],
          paciensNev: scannedData[1],
          szulDatum: scannedData[2],
          orvos: scannedData[3],
          szerep: scannedData[4],
        };
        console.log('Beolvasott qrqode: ', scannedData);
        navigate('QrCodeElfogad', {adat});
      } else {
        setIsmeteltId(true);
        setScanned(true);
        return;
      }
    });*/
  };

  return (
    <CameraScreen
      // Barcode props
      scanBarcode={true}
      onReadCode={event => readQRCode(event.nativeEvent.codeStringValue)} // optional
      showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
      laserColor="red" // (default red) optional, color of laser in scanner frame
      frameColor="white" // (default white) optional, color of border of scanner frame
    />
  );
};
