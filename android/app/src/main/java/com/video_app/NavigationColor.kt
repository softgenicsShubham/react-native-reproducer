package com.video_app

import android.app.Activity
import android.graphics.Color
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.view.Window
import android.view.WindowManager
import com.facebook.common.logging.FLog
import com.facebook.react.bridge.*
import com.facebook.react.common.ReactConstants

class NavigationColor(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "NavigationColor"
    }

    @ReactMethod
    fun setNavigationBarColor(color: String) {
        val activity: Activity? = currentActivity
        activity?.let {
            Thread {
                val parsedColor = Color.parseColor(color)

                Handler(Looper.getMainLooper()).post {
                    val window: Window = it.window
                    window.navigationBarColor = parsedColor
                }
            }.start()
        }
    }

    @ReactMethod
    fun setHidden(hidden: Boolean) {
        val activity = currentActivity
        if (activity == null) {
            FLog.w(
                ReactConstants.TAG,
                "StatusBarModule: Ignored status bar change, current activity is null.")
            return
        }
        UiThreadUtil.runOnUiThread(
            Runnable {
                val window = activity.window ?: return@Runnable
                if (hidden) {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                        // Ensure the content extends into the cutout area
                        window.attributes.layoutInDisplayCutoutMode =
                            WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
                        window.setDecorFitsSystemWindows(false)
                    }
                    window.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
                    window.clearFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN)
                } else {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                        window.attributes.layoutInDisplayCutoutMode =
                            WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT
                        window.setDecorFitsSystemWindows(true)
                    }
                    window.addFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN)
                    window.clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
                }
            })
    }


}
