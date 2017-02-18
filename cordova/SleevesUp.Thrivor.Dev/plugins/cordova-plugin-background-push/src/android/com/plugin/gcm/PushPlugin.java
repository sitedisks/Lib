package com.plugin.gcm;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import com.google.android.gcm.GCMRegistrar;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

/**
 * @author awysocki
 */

public class PushPlugin extends CordovaPlugin {
	public static final String TAG = "PushPlugin";

	public static final String REGISTER = "register";
	public static final String UNREGISTER = "unregister";
	public static final String SET_AUTO_MESSAGE_COUNT = "setAutoMessageCount";
	public static final String LOCAL_NOTIFICATION = "localNotification";
	public static final String CANCEL_NOTIFICATION = "cancelNotification";
	private static final LocalNotification localNotification = new LocalNotification();

	private static CordovaWebView gWebView;
	private static String gECB;
	private static String gSenderID;
	private static Bundle gCachedExtras = null;
	private static boolean gForeground = false;
	private static boolean gReceiveNotificationInBackground = false;
	private static boolean gStartServiceAlwaysInBackground = false;
	private static boolean gTapNotificationToStartApp = false;

	/**
	 * Gets the application context from cordova's main activity.
	 * @return the application context
	 */
	private Context getApplicationContext() {
		return this.cordova.getActivity().getApplicationContext();
	}

	@Override
	public boolean execute(String action, JSONArray data, CallbackContext callbackContext) {

		boolean result = false;

		Log.v(TAG, "execute: action=" + action);

		if (REGISTER.equals(action)) {
			Log.v(TAG, "execute: data=" + data.toString());
			try {
				JSONObject jo = data.getJSONObject(0);
				gWebView = this.webView;
				Log.v(TAG, "execute: jo=" + jo.toString());
				gECB = (String) jo.get("ecb");
				gSenderID = (String) jo.get("senderID");
				Log.v(TAG, "execute: ECB=" + gECB + " senderID=" + gSenderID);

				// Configuration options for background processing
				// When receiveNotificationInBackground is true, please use e.g. following plugin
				// https://github.com/katzer/cordova-plugin-background-mode
				gReceiveNotificationInBackground = jo.optBoolean("receiveNotificationInBackground",false);
				gStartServiceAlwaysInBackground = jo.optBoolean("startServiceAlwaysInBackground",false);
				gTapNotificationToStartApp = jo.optBoolean("tapNotificationToStartApp",false);

				GCMRegistrar.register(getApplicationContext(), gSenderID);
				result = true;
				callbackContext.success();
			} catch (JSONException e) {
				Log.e(TAG, "execute: Got JSON Exception " + e.getMessage());
				result = false;
				callbackContext.error(e.getMessage());
			}
			if ( gCachedExtras != null) {
				Log.v(TAG, "sending cached extras");
				sendExtras(gCachedExtras);
				gCachedExtras = null;
			}

		} else if (UNREGISTER.equals(action)) {
			GCMRegistrar.unregister(getApplicationContext());
			Log.v(TAG, "UNREGISTER");
			result = true;
			callbackContext.success();
		} else if (SET_AUTO_MESSAGE_COUNT.equals(action)) {
			Log.v(TAG, "setAutoMessageCount");
			int count = data.optInt(0, 0);
			localNotification.setAutoMessageCount(cordova.getActivity(), count);
		} else if (LOCAL_NOTIFICATION.equals(action)) {
			Log.v(TAG, "localNotification");
			try {
				JSONObject jo = data.getJSONObject(0);
				Bundle extras = new Bundle();
				for(Iterator<String> iter = jo.keys();iter.hasNext();) {
					String key = iter.next();
					String value = jo.getString(key);
					extras.putString(key,value);
				}
				localNotification.createAndStartNotification(cordova.getActivity(), extras);
			} catch (JSONException e) {
				Log.e(TAG, "execute: Got JSON Exception " + e.getMessage());
				result = false;
				callbackContext.error(e.getMessage());
			}
		} else if (CANCEL_NOTIFICATION.equals(action)) {
			Log.v(TAG, "cancelNotification");
			int id = data.optInt(0,0);
			localNotification.cancelNotification(cordova.getActivity(), id);
		} else {
			result = false;
			Log.e(TAG, "Invalid action : " + action);
			callbackContext.error("Invalid action : " + action);
		}

		return result;
	}

	/*
	 * Sends a json object to the client as parameter to a method which is defined in gECB.
	 */
	public static void sendJavascript(JSONObject _json) {
		String _d = "javascript:" + gECB + "(" + _json.toString() + ")";
		Log.v(TAG, "sendJavascript: " + _d);

		if (gECB != null && gWebView != null) {
			gWebView.sendJavascript(_d);
		}
	}

	/*
	 * Sends the pushbundle extras to the client application.
	 * If the client application isn't currently active, it is cached for later processing.
	 */
	public static void sendExtras(Bundle extras)
	{
		if (extras != null) {
			if (gECB != null && gWebView != null) {
				sendJavascript(convertBundleToJson(extras));
			} else {
				Log.v(TAG, "sendExtras: caching extras to send at a later time.");
				gCachedExtras = extras;
			}
		}
	}

	@Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);
		gForeground = true;
	}

	@Override
	public void onPause(boolean multitasking) {
		super.onPause(multitasking);
		gForeground = false;
		localNotification.cancelNotification(cordova.getActivity(),0); // cancel automatically only notifications with id 0
	}

	@Override
	public void onResume(boolean multitasking) {
		super.onResume(multitasking);
		gForeground = true;
	}

	@Override
	public void onDestroy() {
		super.onDestroy();
		gForeground = false;
		gECB = null;
		gWebView = null;
	}

	/*
	 * serializes a bundle to JSON.
	 */
	private static JSONObject convertBundleToJson(Bundle extras)
	{
		try
		{
			JSONObject json;
			json = new JSONObject().put("event", "message");

			JSONObject jsondata = new JSONObject();
			Iterator<String> it = extras.keySet().iterator();
			while (it.hasNext())
			{
				String key = it.next();
				Object value = extras.get(key);

				// System data from Android
				if (key.equals("from") || key.equals("collapse_key"))
				{
					json.put(key, value);
				}
				else if (key.equals("foreground"))
				{
					json.put(key, extras.getBoolean("foreground"));
				}
				else if (key.equals("coldstart"))
				{
					json.put(key, extras.getBoolean("coldstart"));
				}
				else
				{
					// Maintain backwards compatibility
					if (key.equals("message") || key.equals("msgcnt") || key.equals("soundname") ||
							key.equals("data") || key.equals("time") || key.equals("notId") )
					{
						json.put(key, value);
					}

					if ( value instanceof String ) {
					// Try to figure out if the value is another JSON object

						String strValue = (String)value;
						if (strValue.startsWith("{")) {
							try {
								JSONObject json2 = new JSONObject(strValue);
								jsondata.put(key, json2);
							}
							catch (Exception e) {
								jsondata.put(key, value);
							}
							// Try to figure out if the value is another JSON array
						}
						else if (strValue.startsWith("["))
						{
							try
							{
								JSONArray json2 = new JSONArray(strValue);
								jsondata.put(key, json2);
							}
							catch (Exception e)
							{
								jsondata.put(key, value);
							}
						}
						else
						{
							jsondata.put(key, value);
						}
					}
				}
			} // while
			json.put("payload", jsondata);

			Log.v(TAG, "extrasToJSON: " + json.toString());

			return json;
		}
		catch( JSONException e)
		{
			Log.e(TAG, "extrasToJSON: JSON exception");
		}
		return null;
	}

	public static boolean isInForeground(){ return gForeground;}

	public static boolean isActive() {return gWebView != null;}

	public static boolean receiveNotificationInBackground() {return gReceiveNotificationInBackground; }

	public static boolean startServiceAlwaysInBackground() { return gStartServiceAlwaysInBackground; }

	public static boolean tapNotificationToStartApp() { return gTapNotificationToStartApp; }
}
