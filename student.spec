# %VERSION% is the package version

Summary: CBORD Student Package
Name: student
Version: %VERSION%
Release: %RELEASE%
License: None
Group: None
URL: http://www.cbord.com
Source0: %{name}.tar.gz
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-root
BuildArch: noarch

%description
CBORD Student Package

%prep
%setup -q -n %{name}

%build

%install
rm -rf $RPM_BUILD_ROOT
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student/assets
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student/assets/icon
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student/assets/images
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student/assets/fonts
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student/svg
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student/cordova-js-src
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student/cordova-js-src/android
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student/cordova-js-src/plugin
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student/cordova-js-src/plugin/android

install -c -m 664 *.* $RPM_BUILD_ROOT/home/httpd/student
install -c -m 664 assets/*.* $RPM_BUILD_ROOT/home/httpd/student/assets
install -c -m 664 assets/icon/*.* $RPM_BUILD_ROOT/home/httpd/student/assets/icon
install -c -m 664 assets/images/*.* $RPM_BUILD_ROOT/home/httpd/student/assets/images
install -c -m 664 assets/fonts/*.* $RPM_BUILD_ROOT/home/httpd/student/assets/fonts
install -c -m 664 svg/*.* $RPM_BUILD_ROOT/home/httpd/student/svg
install -c -m 664 cordova-js-src/*.* $RPM_BUILD_ROOT/home/httpd/student/cordova-js-src
install -c -m 664 cordova-js-src/android/*.* $RPM_BUILD_ROOT/home/httpd/student/cordova-js-src/android
install -c -m 664 cordova-js-src/plugin/*.* $RPM_BUILD_ROOT/home/httpd/student/cordova-js-src/plugin
install -c -m 664 cordova-js-src/plugin/android/*.* $RPM_BUILD_ROOT/home/httpd/student/cordova-js-src/plugin/android


%clean
rm -rf $RPM_BUILD_ROOT

%preun


%post


%files


/home/httpd/student


%doc
