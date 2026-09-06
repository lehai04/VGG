$ErrorActionPreference = 'Stop'
$root = 'C:\Users\lepha\VGG'
$pairs = @(
  @('docs\ba\01-business\VGG_BRD_v0.1_2026-09-04.docx','docs\ba\01-business\VGG_BRD_v0.1_2026-09-04.pdf'),
  @('docs\ba\02-requirements\VGG_SRS_v0.1_2026-09-04.docx','docs\ba\02-requirements\VGG_SRS_v0.1_2026-09-04.pdf'),
  @('docs\ba\04-uat\VGG_UAT-HANDOVER_v0.1_2026-09-04.docx','docs\ba\04-uat\VGG_UAT-HANDOVER_v0.1_2026-09-04.pdf'),
  @('docs\ba\05-reports\VGG_STAKEHOLDER-REPORT_v0.1_2026-09-04.docx','docs\ba\05-reports\VGG_STAKEHOLDER-REPORT_v0.1_2026-09-04.pdf')
)
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
  foreach ($pair in $pairs) {
    $src = Join-Path $root $pair[0]
    $dst = Join-Path $root $pair[1]
    $doc = $word.Documents.Open($src, $false, $true)
    try { $doc.ExportAsFixedFormat($dst, 17) } finally { $doc.Close($false) }
    Write-Output "PDF_CREATED $dst"
  }
} finally {
  $word.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}
