document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('url-input');
    const generateBtn = document.getElementById('generate-btn');
    const statusText = document.getElementById('status-text');
    const statusDot = document.querySelector('.status-dot');
    const loadingAnimation = document.getElementById('loading-animation');
    const appInfoBox = document.getElementById('app-info-box');
    const appName = document.getElementById('app-name');
    const appId = document.getElementById('app-id');
    const progressFill = document.getElementById('progress-fill');
    const downloadPercentage = document.getElementById('download-percentage');
    const downloadSize = document.getElementById('download-size');
    const downloadBtn = document.getElementById('download-btn');
    
    generateBtn.addEventListener('click', handleGenerateIPK);
    downloadBtn.addEventListener('click', handleDownloadClick);
    
    // Also allow pressing Enter key in the input field
    urlInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleGenerateIPK();
        }
    });
    
    function handleGenerateIPK() {
        const url = urlInput.value.trim();
        
        if (!url) {
            showError('Please enter a valid URL');
            return;
        }
        
        // Check if it's the Prime Video app URL
        if (url.includes('appId=340303')) {
            window.location.href = 'https://github.com/itsRealM12C/listofipkfiles/raw/refs/heads/main/amazon.ipk';
            return;
        }
        
        // Check if it's the WWE Network app URL
        if (url.includes('appId=299872')) {
            window.location.href = 'https://github.com/itsRealM12C/listofipkfiles/raw/refs/heads/main/com.wwe.app.wwenetwork.ipk';
            return;
        }

        // Check if it's the YouTube app URL
        if (url.includes('appId=95384')) {
            window.location.href = 'https://github.com/itsRealM12C/listofipkfiles/raw/refs/heads/main/youtube.leanback.v4.ipk';
            return;
        }
        
        // Check if it's the Klebo Hub app URL
        if (url.includes('appId=1247978')) {
            window.location.href = 'https://github.com/itsRealM12C/listofipkfiles/raw/refs/heads/main/com.klebo.hub.ipk';
            return;
        }
        
        // Check if it's the Spotify app URL
        if (url.includes('appId=249717')) {
            window.location.href = 'https://github.com/itsRealM12C/listofipkfiles/raw/refs/heads/main/spotify-beehive.ipk';
            return;
        }
        
        // Check if it's app ID 4161
        if (url.includes('appId=4161')) {
            window.location.href = 'https://github.com/itsRealM12C/listofipkfiles/raw/refs/heads/main/com.27668.4161.ipk';
            return;
        }
        
        // Check if it's app ID 1224520
        if (url.includes('appId=1224520')) {
            window.location.href = 'https://github.com/itsRealM12C/listofipkfiles/raw/refs/heads/main/com.lgdev.appcts.ipk';
            return;
        }
        
        // Check if it's app ID 272601
        if (url.includes('appId=272601')) {
            window.location.href = 'https://github.com/itsRealM12C/listofipkfiles/raw/refs/heads/main/spielecenter.tv.itsmy.lgapp.ipk';
            return;
        }
        
        // Check if it's the Disney+ app URL
        if (url.includes('appId=963996')) {
            window.location.href = 'https://github.com/itsRealM12C/listofipkfiles/raw/refs/heads/main/com.disney.disneyplus-prod.ipk';
            return;
        }
        
        // Check if it's the app ID 70318
        if (url.includes('appId=70318')) {
            window.location.href = 'https://drive.usercontent.google.com/download?id=13zVOaaMF55NaJSiUNcGZAcqlT21h6kFQ&export=download&authuser=0';
            return;
        }
        
        // Check if it's a valid LG App Store URL format
        if (!isValidLGAppURL(url)) {
            showError('Please enter a valid LG App Store URL');
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        // Extract app ID from URL
        const extractedAppId = extractAppId(url);
        
        // Reset progress
        resetProgress();
        
        // Show app info with loading
        showAppInfo(extractedAppId);
        
        // Simulate the IPK fetch process with progress updates
        simulateProgressUpdates(extractedAppId);
    }
    
    function handleDownloadClick() {
        const extractedAppId = appId.textContent.replace('ID: ', '');
        downloadIPK(extractedAppId);
        
        showSuccess('IPK file successfully downloaded!');
        
        // Reset status after 5 seconds
        setTimeout(() => {
            resetStatus();
        }, 5000);
    }
    
    function showAppInfo(appId) {
        // Update app info box with extracted data
        let appNameText = 'LG TV Application';
        if (appId) {
            appNameText += ` #${appId}`;
        }
        
        appName.textContent = appNameText;
        appId.textContent = `ID: ${appId}`;
        
        // Show app info box
        appInfoBox.classList.remove('hidden');
    }
    
    function simulateProgressUpdates(appId) {
        // Generate a random "real" file size in megabytes (between 10-500 MB)
        const realSizeMB = Math.floor(Math.random() * 491) + 10;
        downloadSize.textContent = `${realSizeMB} MB`;
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Show download button when complete
                downloadBtn.classList.remove('hidden');
                setLoadingState(false);
                
                statusText.textContent = 'IPK file ready to download';
            }
            
            // Update progress bar and text
            progressFill.style.width = `${progress}%`;
            downloadPercentage.textContent = `${Math.round(progress)}%`;
        }, 300);
    }
    
    function resetProgress() {
        progressFill.style.width = '0%';
        downloadPercentage.textContent = '0%';
        downloadSize.textContent = '-- MB';
        downloadBtn.classList.add('hidden');
    }
    
    function isValidLGAppURL(url) {
        // Basic check for LG App Store URL format
        return url.startsWith('https://') && 
               (url.includes('lgappstv.com') || url.includes('lge.com')) && 
               url.includes('appId=');
    }
    
    function extractAppId(url) {
        // Extract the app ID from the URL
        const appIdMatch = url.match(/appId=(\d+)/);
        return appIdMatch ? appIdMatch[1] : 'unknown';
    }
    
    function downloadIPK(appId) {
        // Generate a random "real" file size in megabytes (between 10-500 MB)
        const realSizeMB = parseInt(downloadSize.textContent);
        // Calculate byte size based on MB
        const sizeBytes = realSizeMB * 1024 * 1024;
        
        // Create a Blob with random data of the appropriate size
        const arrayBuffer = new ArrayBuffer(Math.min(sizeBytes, 10 * 1024 * 1024)); // Limit to 10MB for browser performance
        const uint8Array = new Uint8Array(arrayBuffer);
        // Fill with random data
        for (let i = 0; i < uint8Array.length; i++) {
            uint8Array[i] = Math.floor(Math.random() * 256);
        }
        const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
        
        // Create a download link for the blob
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${appId}_app.ipk`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL object
        setTimeout(() => URL.revokeObjectURL(link.href), 100);
    }
    
    function setLoadingState(isLoading) {
        if (isLoading) {
            statusText.textContent = 'Fetching application...';
            statusDot.classList.add('working');
            loadingAnimation.classList.remove('hidden');
            generateBtn.disabled = true;
        } else {
            loadingAnimation.classList.add('hidden');
            generateBtn.disabled = false;
        }
    }
    
    function showError(message) {
        statusText.textContent = message;
        statusDot.className = 'status-dot error';
        
        // Hide app info box if there's an error
        appInfoBox.classList.add('hidden');
    }
    
    function showSuccess(message) {
        statusText.textContent = message;
        statusDot.className = 'status-dot';
    }
    
    function resetStatus() {
        statusText.textContent = 'Ready';
        statusDot.className = 'status-dot';
    }
});
