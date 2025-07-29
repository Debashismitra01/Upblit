using System;
using WixSharp;
using WixSharp.CommonTasks;
using WixSharp.UI;

class Program
{
    static void Main()
    {
        // Define the installer project
        var project = new ManagedProject("DeployX",

            // Installation directory and files
            new Dir(@"%ProgramFiles%\DeployX",
                new File(@"deployx.exe")),

            // OS requirement: Windows 7 or later
            new LaunchCondition("Installed OR (VersionNT >= 601)",
                "This application requires Windows 7 or higher.")
        );

        // Basic product metadata
        project.Version = new Version("1.0.0.0");
        project.GUID = new Guid("bba5a123-0e56-44c7-995b-4d2344c5e5e7");
        project.OutFileName = "DeployXInstaller";

        // Control Panel details
        project.ControlPanelInfo.Manufacturer = "Debashis Mitra";
        project.ControlPanelInfo.ProductIcon = "deployx.exe";

        // UI: Use InstallDir dialog and custom images
        project.UI = WUI.WixUI_InstallDir;
        project.BannerImage = "banner.bmp";     // 493x58
        project.BackgroundImage = "dialog.bmp";
        project.ValidateBackgroundImage = false; // 500x314

        project.PreserveTempFiles = true;
        project.MajorUpgradeStrategy = MajorUpgradeStrategy.Default;


        // Optional license agreement
        // project.LicenceFile = "license.rtf";

        // If WiX v3.11 is installed here:
        Compiler.WixLocation = @"C:\Program Files (x86)\WiX Toolset v3.11\bin";

        // Build the MSI
        Compiler.BuildMsi(project);
    }
}
