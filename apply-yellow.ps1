# Comprehensive blue-to-yellow accent replacement across StudyAI
# Yellow accent: #FBFF1F / brand palette

$srcDir = 'c:\Users\PALLAB\OneDrive\Desktop\study\src'

$files = Get-ChildItem $srcDir -Recurse -Include '*.tsx','*.ts' -File

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content

    # ============================================================
    # BACKGROUND COLORS: blue -> brand yellow
    # ============================================================
    # Primary brand backgrounds (buttons, badges, logo icons)
    $content = $content -replace 'bg-blue-600 ', 'bg-brand ' 
    $content = $content -replace 'bg-blue-600"', 'bg-brand"'
    $content = $content -replace 'bg-blue-700 ', 'bg-brand-dark '
    $content = $content -replace 'bg-blue-700"', 'bg-brand-dark"'
    $content = $content -replace 'hover:bg-blue-700 ', 'hover:bg-brand-dark '
    $content = $content -replace 'hover:bg-blue-700"', 'hover:bg-brand-dark"'
    $content = $content -replace 'hover:bg-blue-600 ', 'hover:bg-brand '
    $content = $content -replace 'hover:bg-blue-600"', 'hover:bg-brand"'
    $content = $content -replace 'hover:bg-blue-500 ', 'hover:bg-brand '
    $content = $content -replace 'hover:bg-blue-500"', 'hover:bg-brand"'
    $content = $content -replace 'active:bg-blue-800', 'active:bg-brand-dark'
    
    # Light tint backgrounds
    $content = $content -replace 'bg-blue-50/80', 'bg-brand-50/80'
    $content = $content -replace 'bg-blue-50/70', 'bg-brand-50/70'
    $content = $content -replace 'bg-blue-50 ', 'bg-brand-50 '
    $content = $content -replace 'bg-blue-50"', 'bg-brand-50"'
    $content = $content -replace 'bg-blue-100/70', 'bg-brand-100/70'
    $content = $content -replace 'bg-blue-100 ', 'bg-brand-100 '
    $content = $content -replace 'bg-blue-100"', 'bg-brand-100"'
    $content = $content -replace 'hover:bg-blue-50 ', 'hover:bg-brand-50 '
    $content = $content -replace 'hover:bg-blue-50"', 'hover:bg-brand-50"'
    $content = $content -replace 'active:bg-blue-100', 'active:bg-brand-100'
    
    # Dark mode backgrounds
    $content = $content -replace 'dark:bg-blue-600 ', 'dark:bg-brand '
    $content = $content -replace 'dark:bg-blue-600"', 'dark:bg-brand"'
    $content = $content -replace 'dark:bg-blue-500 ', 'dark:bg-brand '
    $content = $content -replace 'dark:bg-blue-500"', 'dark:bg-brand"'
    $content = $content -replace 'dark:hover:bg-blue-500 ', 'dark:hover:bg-brand '
    $content = $content -replace 'dark:hover:bg-blue-500"', 'dark:hover:bg-brand"'
    $content = $content -replace 'dark:bg-blue-900/50', 'dark:bg-brand-900/50'
    $content = $content -replace 'dark:bg-blue-950/40', 'dark:bg-brand-950/40'
    $content = $content -replace 'dark:bg-blue-950/60', 'dark:bg-brand-950/60'
    $content = $content -replace 'dark:bg-blue-950 ', 'dark:bg-brand-950 '
    $content = $content -replace 'dark:bg-blue-950"', 'dark:bg-brand-950"'
    $content = $content -replace 'dark:hover:bg-blue-950/40', 'dark:hover:bg-brand-950/40'

    # ============================================================
    # TEXT COLORS: blue -> brand-dark (dark enough for contrast)
    # ============================================================
    # Since #FBFF1F is very light, text on white needs to be darker
    $content = $content -replace 'text-blue-600 ', 'text-brand-600 '
    $content = $content -replace 'text-blue-600"', 'text-brand-600"'
    $content = $content -replace 'text-blue-700 ', 'text-brand-700 '
    $content = $content -replace 'text-blue-700"', 'text-brand-700"'
    $content = $content -replace 'text-blue-800', 'text-brand-700'
    $content = $content -replace 'text-blue-500', 'text-brand-500'
    $content = $content -replace 'text-blue-400', 'text-brand-400'
    $content = $content -replace 'text-blue-300', 'text-brand-300'
    $content = $content -replace 'text-blue-100/90', 'text-brand-100/90'
    $content = $content -replace 'text-blue-100', 'text-brand-100'
    $content = $content -replace 'hover:text-blue-600 ', 'hover:text-brand-600 '
    $content = $content -replace 'hover:text-blue-600"', 'hover:text-brand-600"'
    $content = $content -replace 'dark:text-blue-400 ', 'dark:text-brand-400 '
    $content = $content -replace 'dark:text-blue-400"', 'dark:text-brand-400"'
    $content = $content -replace 'dark:text-blue-300 ', 'dark:text-brand-300 '
    $content = $content -replace 'dark:text-blue-300"', 'dark:text-brand-300"'
    $content = $content -replace 'dark:hover:text-blue-400 ', 'dark:hover:text-brand-400 '
    $content = $content -replace 'dark:hover:text-blue-400"', 'dark:hover:text-brand-400"'
    $content = $content -replace 'group-hover:text-blue-600', 'group-hover:text-brand-600'
    $content = $content -replace 'dark:group-hover:text-blue-400', 'dark:group-hover:text-brand-400'

    # ============================================================
    # BORDER COLORS
    # ============================================================
    $content = $content -replace 'border-blue-200/60', 'border-brand-200/60'
    $content = $content -replace 'border-blue-200 ', 'border-brand-200 '
    $content = $content -replace 'border-blue-200"', 'border-brand-200"'
    $content = $content -replace 'border-blue-300', 'border-brand-300'
    $content = $content -replace 'border-blue-500/20', 'border-brand-500/20'
    $content = $content -replace 'dark:border-blue-800/40', 'dark:border-brand-800/40'
    $content = $content -replace 'dark:border-blue-800 ', 'dark:border-brand-800 '
    $content = $content -replace 'dark:border-blue-800"', 'dark:border-brand-800"'
    $content = $content -replace 'dark:border-blue-900', 'dark:border-brand-900'
    $content = $content -replace 'hover:border-blue-300', 'hover:border-brand-300'

    # ============================================================
    # SHADOW COLORS
    # ============================================================
    $content = $content -replace 'shadow-blue-600/20', 'shadow-brand/20'
    $content = $content -replace 'shadow-blue-600/25', 'shadow-brand/25'
    $content = $content -replace 'shadow-blue-500/10', 'shadow-brand/10'
    $content = $content -replace 'shadow-blue-500/20', 'shadow-brand/20'

    # ============================================================
    # RING / FOCUS COLORS
    # ============================================================
    $content = $content -replace 'ring-blue-500', 'ring-brand'
    $content = $content -replace 'ring-blue-600', 'ring-brand'
    $content = $content -replace 'focus:ring-blue-500', 'focus:ring-brand'
    $content = $content -replace 'focus:ring-blue-600', 'focus:ring-brand'

    # ============================================================
    # GRADIENT COLORS
    # ============================================================
    $content = $content -replace 'from-blue-600 ', 'from-brand '
    $content = $content -replace 'from-blue-600"', 'from-brand"'
    $content = $content -replace 'from-blue-700', 'from-brand-dark'
    $content = $content -replace 'from-blue-500/10', 'from-brand/10'
    $content = $content -replace 'via-blue-700', 'via-brand-dark'
    $content = $content -replace 'via-blue-500/5', 'via-brand/5'
    $content = $content -replace 'to-indigo-700', 'to-brand-dark'
    $content = $content -replace 'via-indigo-500/5', 'via-brand/5'

    # ============================================================
    # DECORATION COLORS
    # ============================================================
    $content = $content -replace 'decoration-blue-300', 'decoration-brand-300'

    if ($content -ne $original) {
        Set-Content $file.FullName $content -NoNewline
        Write-Host "Updated: $($file.FullName.Replace($srcDir + '\', ''))"
    }
}

Write-Host "`nDone!"
