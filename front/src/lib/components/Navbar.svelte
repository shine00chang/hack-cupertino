<nav class="flex flex-row z-50 justify-center gap-14 bg-gradient-to-r from-slate-600 to-slate-500 text-gray-50 p-4 shadow-slate-400 shadow">
    <a href="/" class="hover:text-blue-200">REPORT</a>
    <a href="/map" class="hover:text-blue-200">MAP</a>
    <a href="/about" class="hover:text-blue-200">ABOUT</a>
</nav>

<!---->
<style>
    a {
        position: relative;
    }
    a:after {
        content: "";
        height: 1px;
        position: absolute;
        border: 2px solid rgba(255, 255, 255, 0);
        left: 0;
        bottom: 0;
        width: 1px;
        transition: width 0.6s ease, border 0.6s ease;
    }
    a:hover:after {
        width: 100%;
        border: 2px solid rgb(191 219 254);
    }
</style>
<!---->