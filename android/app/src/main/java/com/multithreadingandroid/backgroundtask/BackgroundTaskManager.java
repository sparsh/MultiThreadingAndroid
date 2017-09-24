package com.multithreadingandroid.backgroundtask;

import android.os.AsyncTask;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by Sparsh on 24/09/17.
 */

public class BackgroundTaskManager extends ReactContextBaseJavaModule {



    @ReactMethod
    public void callNativeFunction()
    {
        new BackgroundAsyncTaskManager().execute();
    }


    private class BackgroundAsyncTaskManager extends AsyncTask<String,String,String>
    {

        @Override
        protected String doInBackground(String... strings) {
            publishProgress("Loading....");
            try{

                Thread.sleep(6000);
            }
            catch(Exception e)
            {
                e.printStackTrace();
            }

            return "Done";
        }


        @Override
        protected void onPostExecute(String s) {

            WritableMap map = Arguments.createMap();
            map.putString("status","Done");
            sendEvent("backgroundTaskEvent",map);
        }


        @Override
        protected void onProgressUpdate(String... values) {

            WritableMap map = Arguments.createMap();
            map.putString("status","Loading.....");
            sendEvent("backgroundTaskEvent",map);
        }
    }


    public BackgroundTaskManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }


    private void sendEvent(String backgroundTaskStatus, WritableMap map) {
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(backgroundTaskStatus, map);


    }

    @Override
    public String getName() {
        return "Background";
    }
}
