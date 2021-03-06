FasdUAS 1.101.10   ��   ��    k             l      ��  ��   *********************************************************

ADOBE SYSTEMS INCORPORATED 
Copyright 2008-2010 Adobe Systems Incorporated 
All Rights Reserved 

NOTICE:  Adobe permits you to use, modify, and 
distribute this file in accordance with the terms
of the Adobe license agreement accompanying it.  
If you have received this file from a source 
other than Adobe, then your use, modification,
or distribution of it requires the prior     
written permission of Adobe. 

********************************************************     � 	 	& * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 
 A D O B E   S Y S T E M S   I N C O R P O R A T E D   
 C o p y r i g h t   2 0 0 8 - 2 0 1 0   A d o b e   S y s t e m s   I n c o r p o r a t e d   
 A l l   R i g h t s   R e s e r v e d   
 
 N O T I C E :     A d o b e   p e r m i t s   y o u   t o   u s e ,   m o d i f y ,   a n d   
 d i s t r i b u t e   t h i s   f i l e   i n   a c c o r d a n c e   w i t h   t h e   t e r m s 
 o f   t h e   A d o b e   l i c e n s e   a g r e e m e n t   a c c o m p a n y i n g   i t .     
 I f   y o u   h a v e   r e c e i v e d   t h i s   f i l e   f r o m   a   s o u r c e   
 o t h e r   t h a n   A d o b e ,   t h e n   y o u r   u s e ,   m o d i f i c a t i o n , 
 o r   d i s t r i b u t i o n   o f   i t   r e q u i r e s   t h e   p r i o r           
 w r i t t e n   p e r m i s s i o n   o f   A d o b e .   
 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   
  
 l     ��������  ��  ��        l     ��  ��    F @ This script interrogates selected path and group items for fill     �   �   T h i s   s c r i p t   i n t e r r o g a t e s   s e l e c t e d   p a t h   a n d   g r o u p   i t e m s   f o r   f i l l      l     ��  ��    E ? colors and adds all fill colors found to a swatch group titled     �   ~   c o l o r s   a n d   a d d s   a l l   f i l l   c o l o r s   f o u n d   t o   a   s w a t c h   g r o u p   t i t l e d      l     ��  ��    G A SwatchGroupFromArt, if the fill colors already exist as swatches     �   �   S w a t c h G r o u p F r o m A r t ,   i f   t h e   f i l l   c o l o r s   a l r e a d y   e x i s t   a s   s w a t c h e s      l     ��  ��    E ? they are moved to the swatch group, otherwise they are created     �   ~   t h e y   a r e   m o v e d   t o   t h e   s w a t c h   g r o u p ,   o t h e r w i s e   t h e y   a r e   c r e a t e d     !   l     �� " #��   "   in the swatch group.    # � $ $ *   i n   t h e   s w a t c h   g r o u p . !  % & % l     ��������  ��  ��   &  ' ( ' l     �� ) *��   ) B < NOTE: This script only processes path items and group items    * � + + x   N O T E :   T h i s   s c r i p t   o n l y   p r o c e s s e s   p a t h   i t e m s   a n d   g r o u p   i t e m s (  , - , l     �� . /��   . 3 - and also ignores pattern and gradient fills.    / � 0 0 Z   a n d   a l s o   i g n o r e s   p a t t e r n   a n d   g r a d i e n t   f i l l s . -  1 2 1 l     ��������  ��  ��   2  3 4 3 l    ? 5���� 5 O     ? 6 7 6 k    > 8 8  9 : 9 I   	������
�� .miscactvnull��� ��� null��  ��   :  ; < ; l  
 
�� = >��   = . ( Check there is at least 1 document open    > � ? ? P   C h e c k   t h e r e   i s   a t   l e a s t   1   d o c u m e n t   o p e n <  @�� @ Z   
 > A B�� C A ?   
  D E D l  
  F���� F I  
 �� G��
�� .corecnte****       **** G 2   
 ��
�� 
docu��  ��  ��   E m    ����   B k    6 H H  I J I l   �� K L��   K 1 + Check there is a selection in the document    L � M M V   C h e c k   t h e r e   i s   a   s e l e c t i o n   i n   t h e   d o c u m e n t J  N O N r     P Q P n     R S R 1    ��
�� 
sele S 1    ��
�� 
aiAD Q o      ���� 	0 paths   O  T�� T Z    6 U V�� W U ?    % X Y X l   # Z���� Z I   #�� [��
�� .corecnte****       **** [ o    ���� 	0 paths  ��  ��  ��   Y m   # $����   V k   ( . \ \  ] ^ ] l  ( (�� _ `��   _ * $ Iterate through selected path items    ` � a a H   I t e r a t e   t h r o u g h   s e l e c t e d   p a t h   i t e m s ^  b�� b n  ( . c d c I   ) .�� e���� 0 
checkpaths 
checkPaths e  f�� f o   ) *���� 	0 paths  ��  ��   d  f   ( )��  ��   W I  1 6�� g��
�� .sysodisAaleR        TEXT g m   1 2 h h � i i � S e l e c t   s o m e   p a t h   a r t   w i t h   c o l o r s   a p p l i e d   b e f o r e   r u n n i n g   t h i s   s c r i p t��  ��  ��   C I  9 >�� j��
�� .sysodisAaleR        TEXT j m   9 : k k � l l � O p e n   a   d o c u m e n t   c o n t a i n i n g   s o m e   c o l o r e d   p a t h   a r t   b e f o r e   r u n n i n g   t h i s   s c r i p t��  ��   7 m      m m                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  ��  ��   4  n o n l     ��������  ��  ��   o  p q p l     �� r s��   r 8 2 Interrogate each path/group item for fill colors.    s � t t d   I n t e r r o g a t e   e a c h   p a t h / g r o u p   i t e m   f o r   f i l l   c o l o r s . q  u v u i      w x w I      �� y���� 0 
checkpaths 
checkPaths y  z�� z o      ���� 0 selecteditems selectedItems��  ��   x O    & { | { k   % } }  ~  ~ r    
 � � � 4    �� �
�� 
docu � m    ����  � o      ���� 0 docref docRef   � � � r     � � � n     � � � 2   ��
�� 
caSW � o    ���� 0 docref docRef � o      ���� 0 
swatchlist 
swatchList �  � � � r     � � � n    � � � I    �� ����� *0 getswatchgroupindex getSwatchGroupIndex �  ��� � o    ���� 0 docref docRef��  ��   �  f     � o      ����  0 swatchgrpindex swatchGrpIndex �  � � � r      � � � n    � � � 4    �� �
�� 
cSGr � o    ����  0 swatchgrpindex swatchGrpIndex � o    ���� 0 docref docRef � o      ����  0 swatchgroupref swatchGroupRef �  � � � l  ! !�� � ���   � &   Iterate through selected items.    � � � � @   I t e r a t e   t h r o u g h   s e l e c t e d   i t e m s . �  � � � Y   ! ��� � ��� � k   / � �  � � � r   / 5 � � � n   / 3 � � � 4   0 3�� �
�� 
cobj � o   1 2���� 0 i   � o   / 0���� 0 selecteditems selectedItems � o      ���� 0 pathref pathRef �  ��� � Z   6 � � � � � =  6 ; � � � n   6 9 � � � 1   7 9��
�� 
pcls � o   6 7���� 0 pathref pathRef � m   9 :��
�� 
caGP � k   > J � �  � � � r   > C � � � n  > A � � � 2   ? A��
�� 
caPA � o   > ?���� 0 pathref pathRef � o      ���� 0 	grouppath 	groupPath �  ��� � n  D J � � � I   E J�� ����� 0 
checkpaths 
checkPaths �  ��� � o   E F���� 0 	grouppath 	groupPath��  ��   �  f   D E��   �  � � � =  M R � � � n   M P � � � 1   N P��
�� 
pcls � o   M N���� 0 pathref pathRef � m   P Q��
�� 
caPA �  ��� � k   U � � �  � � � l  U U�� � ���   � 3 - Ignore paths with gradient or pattern fills.    � � � � Z   I g n o r e   p a t h s   w i t h   g r a d i e n t   o r   p a t t e r n   f i l l s . �  ��� � Z   U � � ��� � � F   U h � � � >  U \ � � � n   U Z � � � 1   X Z��
�� 
pcls � n   U X � � � 1   V X��
�� 
aiFC � o   U V���� 0 pathref pathRef � m   Z [��
�� 
tGDi � >  _ f � � � n   _ d � � � 1   b d��
�� 
pcls � n   _ b � � � 1   ` b��
�� 
aiFC � o   _ `���� 0 pathref pathRef � m   d e��
�� 
tPTi � k   k � � �  � � � l  k k�� � ���   � ' ! Ignore paths which have no fill.    � � � � B   I g n o r e   p a t h s   w h i c h   h a v e   n o   f i l l . �  ��� � Z   k � � ��� � � =  k p � � � n   k n � � � 1   l n��
�� 
aiFP � o   k l���� 0 pathref pathRef � m   n o��
�� boovfals � I  s z�� ���
�� .sysodisAaleR        TEXT � m   s v � � � � � F P a r t   o f   s e l e c t i o n   h a s   n o   f i l l   c o l o r��  ��   � k   } � � �  � � � l  } }�� � ���   � 9 3 Path item containing valid fill found, search for     � � � � f   P a t h   i t e m   c o n t a i n i n g   v a l i d   f i l l   f o u n d ,   s e a r c h   f o r   �  � � � l  } }�� � ���   � !  matching color in swatches    � � � � 6   m a t c h i n g   c o l o r   i n   s w a t c h e s �  � � � Y   } � ��� � ��� � k   � � � �    r   � � n   � � 4   � ���
�� 
caSW o   � ����� 0 j   o   � ����� 0 docref docRef o      ���� 0 currentswatch currentSwatch  r   � �	
	 n   � � 1   � ���
�� 
colr o   � ��� 0 currentswatch currentSwatch
 o      �~�~ 0 swatchcolor swatchColor  r   � � n   � � 1   � ��}
�} 
aiFC o   � ��|�| 0 pathref pathRef o      �{�{ 0 	fillcolor 	fillColor  r   � � m   � ��z
�z boovfals o      �y�y 0 swatchexists swatchExists �x Z   � ��w�v n  � � I   � ��u�t�u 0 colorequals ColorEquals  o   � ��s�s 0 	fillcolor 	fillColor �r o   � ��q�q 0 swatchcolor swatchColor�r  �t    f   � � k   � �   !"! l  � ��p#$�p  # 3 - Add the existing swatch to the swatch group	   $ �%% Z   A d d   t h e   e x i s t i n g   s w a t c h   t o   t h e   s w a t c h   g r o u p 	" &'& r   � �()( m   � ��o
�o boovtrue) o      �n�n 0 swatchexists swatchExists' *+* I  � ��m,-
�m .AiClkAShnull���    cSGr, o   � ��l�l  0 swatchgroupref swatchGroupRef- �k.�j
�k 
kSWt. o   � ��i�i 0 currentswatch currentSwatch�j  + /�h/  S   � ��h  �w  �v  �x  �� 0 j   � m   � ��g�g  � I  � ��f0�e
�f .corecnte****       ****0 n  � �121 2  � ��d
�d 
caSW2 o   � ��c�c 0 docref docRef�e  ��   � 3�b3 Z   � �45�a�`4 H   � �66 o   � ��_�_ 0 swatchexists swatchExists5 k   � �77 898 l  � ��^:;�^  : . ( Create a new swatch in the swatch group   ; �<< P   C r e a t e   a   n e w   s w a t c h   i n   t h e   s w a t c h   g r o u p9 =>= r   � �?@? I  � ��]�\A
�] .corecrel****      � null�\  A �[B�Z
�[ 
koclB n  � �CDC m   � ��Y
�Y 
caSWD o   � ��X�X 0 docref docRef�Z  @ o      �W�W 0 	newswatch 	newSwatch> EFE r   � �GHG n   � �IJI 1   � ��V
�V 
aiFCJ o   � ��U�U 0 pathref pathRefH n      KLK 1   � ��T
�T 
colrL o   � ��S�S 0 	newswatch 	newSwatchF M�RM I  � ��QNO
�Q .AiClkAShnull���    cSGrN o   � ��P�P  0 swatchgroupref swatchGroupRefO �OP�N
�O 
kSWtP o   � ��M�M 0 	newswatch 	newSwatch�N  �R  �a  �`  �b  ��  ��   � I  � ��LQ�K
�L .sysodisAaleR        TEXTQ m   � �RR �SS � T h i s   s c r i p t   d o e s   n o t   p r o c e s s   p a t h   i t e m s   w i t h   p a t t e r n   o r   g r a d i e n t   f i l l s�K  ��  ��   � I  �JT�I
�J .sysodisAaleR        TEXTT m   UU �VV j T h i s   s c r i p t   o n l y   p r o c e s s e s   g r o u p   i t e m s   a n d   p a t h   i t e m s�I  ��  �� 0 i   � m   $ %�H�H  � I  % *�GW�F
�G .corecnte****       ****W o   % &�E�E 0 selecteditems selectedItems�F  ��   � XYX r  Z[Z I �D\�C
�D .AiClkGAscaSW  @    cSGr\ o  �B�B  0 swatchgroupref swatchGroupRef�C  [ o      �A�A 0 foundswatches foundSwatchesY ]�@] Z  %^_�?�>^ = `a` o  �=�= 0 foundswatches foundSwatchesa J  �<�<  _ I !�;b�:
�; .coredelonull���    obj b o  �9�9  0 swatchgroupref swatchGroupRef�:  �?  �>  �@   | m     cc                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��   v ded l     �8�7�6�8  �7  �6  e fgf l     �5hi�5  h C = Gets the index of the swatch group titled SwatchGroupFromArt   i �jj z   G e t s   t h e   i n d e x   o f   t h e   s w a t c h   g r o u p   t i t l e d   S w a t c h G r o u p F r o m A r tg klk l     �4mn�4  m / ) if not found creates a new swatch group.   n �oo R   i f   n o t   f o u n d   c r e a t e s   a   n e w   s w a t c h   g r o u p .l pqp i    rsr I      �3t�2�3 *0 getswatchgroupindex getSwatchGroupIndext u�1u o      �0�0 0 docref docRef�1  �2  s k     jvv wxw O     gyzy k    f{{ |}| r    ~~ m    �/
�/ boovfals o      �.�. $0 swatchgroupfound swatchGroupFound} ��� Y    E��-���,� k    @�� ��� r    ��� n    ��� 4    �+�
�+ 
cSGr� o    �*�* 0 i  � o    �)�) 0 docref docRef� o      �(�( $0 currentswatchgrp currentSwatchGrp� ��'� Z    @���&�%� F    .��� B   $��� m     �� ��� $ S w a t c h G r o u p F r o m A r t� n     #��� 1   ! #�$
�$ 
pnam� o     !�#�# $0 currentswatchgrp currentSwatchGrp� @  ' ,��� m   ' (�� ��� $ S w a t c h G r o u p F r o m A r t� n   ( +��� 1   ) +�"
�" 
pnam� o   ( )�!�! $0 currentswatchgrp currentSwatchGrp� k   1 <�� ��� r   1 6��� n   1 4��� 1   2 4� 
�  
pidx� o   1 2�� $0 currentswatchgrp currentSwatchGrp� o      �� $0 swatchgroupindex swatchGroupIndex� ��� r   7 :��� m   7 8�
� boovtrue� o      �� $0 swatchgroupfound swatchGroupFound� ���  S   ; <�  �&  �%  �'  �- 0 i  � m    �� � I   ���
� .corecnte****       ****� n   ��� 2   �
� 
cSGr� o    �� 0 docref docRef�  �,  � ��� Z   F f����� H   F H�� o   F G�� $0 swatchgroupfound swatchGroupFound� k   K b�� ��� r   K \��� I  K Z���
� .corecrel****      � null�  � ���
� 
kocl� m   M N�
� 
cSGr� ���
� 
insh� n   O Q���  ;   P Q� o   O P�� 0 docref docRef� ���

� 
prdt� K   R V�� �	��
�	 
pnam� m   S T�� ��� $ S w a t c h G r o u p F r o m A r t�  �
  � o      ��  0 newswatchgroup newSwatchGroup� ��� r   ] b��� n   ] `��� 1   ^ `�
� 
pidx� o   ] ^��  0 newswatchgroup newSwatchGroup� o      �� $0 swatchgroupindex swatchGroupIndex�  �  �  �  z m     ��                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  x ��� L   h j�� o   h i�� $0 swatchgroupindex swatchGroupIndex�  q ��� l     � �����   ��  ��  � ��� l     ������  � 4 . If class of swatch color and fill color match   � ��� \   I f   c l a s s   o f   s w a t c h   c o l o r   a n d   f i l l   c o l o r   m a t c h� ��� l     ������  � ( " checks if the color values match.   � ��� D   c h e c k s   i f   t h e   c o l o r   v a l u e s   m a t c h .� ��� i    ��� I      ������� 0 colorequals ColorEquals� ��� o      ���� 0 	fillcolor 	fillColor� ���� o      ���� 0 swatchcolor swatchColor��  ��  � k     y�� ��� r     ��� m     ��
�� boovfals� o      ���� 0 isequal isEqual� ��� O    v��� k    u�� ��� l   ������  �   Compare colors   � ���    C o m p a r e   c o l o r s� ��� r    ��� n    ��� 1   	 ��
�� 
pcls� o    	���� 0 swatchcolor swatchColor� o      ���� 0 swatchclass swatchClass� ���� Z    u������� =   ��� o    ���� 0 swatchclass swatchClass� n    ��� 1    ��
�� 
pcls� o    ���� 0 	fillcolor 	fillColor� Z    q������ =   ��� o    ���� 0 swatchclass swatchClass� m    ��
�� 
tCMi� r    %� � n   # I    #������ "0 cmykcolorequals CMYKColorEquals  o    ���� 0 	fillcolor 	fillColor �� o    ���� 0 swatchcolor swatchColor��  ��    f      o      ���� 0 isequal isEqual�  =  ( +	
	 o   ( )���� 0 swatchclass swatchClass
 m   ) *��
�� 
tRGi  r   . 7 n  . 5 I   / 5������  0 rgbcolorequals RGBColorEquals  o   / 0���� 0 	fillcolor 	fillColor �� o   0 1���� 0 swatchcolor swatchColor��  ��    f   . / o      ���� 0 isequal isEqual  =  : = o   : ;���� 0 swatchclass swatchClass m   ; <��
�� 
tGRi  r   @ I n  @ G I   A G������ "0 graycolorequals GrayColorEquals  !  o   A B���� 0 	fillcolor 	fillColor! "��" o   B C���� 0 swatchcolor swatchColor��  ��    f   @ A o      ���� 0 isequal isEqual #$# =  L O%&% o   L M���� 0 swatchclass swatchClass& m   M N��
�� 
tLab$ '(' r   R [)*) n  R Y+,+ I   S Y��-����  0 labcolorequals LabColorEquals- ./. o   S T���� 0 	fillcolor 	fillColor/ 0��0 o   T U���� 0 swatchcolor swatchColor��  ��  ,  f   R S* o      ���� 0 isequal isEqual( 121 =  ^ a343 o   ^ _���� 0 swatchclass swatchClass4 m   _ `��
�� 
tCSi2 5��5 r   d m676 n  d k898 I   e k��:���� "0 spotcolorequals SpotColorEquals: ;<; o   e f���� 0 	fillcolor 	fillColor< =��= o   f g���� 0 swatchcolor swatchColor��  ��  9  f   d e7 o      ���� 0 isequal isEqual��  ��  ��  ��  ��  � m    >>                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  � ?��? L   w y@@ o   w x���� 0 isequal isEqual��  � ABA l     ��������  ��  ��  B CDC l     ��EF��  E "  Compares CMYK color values.   F �GG 8   C o m p a r e s   C M Y K   c o l o r   v a l u e s .D HIH i    JKJ I      ��L���� "0 cmykcolorequals CMYKColorEqualsL MNM o      ���� 0 	fillcolor 	fillColorN O��O o      ���� 0 swatchcolor swatchColor��  ��  K k     APP QRQ r     STS m     ��
�� boovfalsT o      ���� 0 isequal isEqualR UVU O    >WXW Z    =YZ����Y F    3[\[ F    ']^] F    _`_ =   aba n    cdc 1   	 ��
�� 
CYANd o    	���� 0 	fillcolor 	fillColorb n    efe 1    ��
�� 
CYANf o    ���� 0 swatchcolor swatchColor` =   ghg n    iji 1    ��
�� 
MAGNj o    ���� 0 	fillcolor 	fillColorh n    klk 1    ��
�� 
MAGNl o    ���� 0 swatchcolor swatchColor^ =   %mnm n    !opo 1    !��
�� 
YELLp o    ���� 0 	fillcolor 	fillColorn n   ! $qrq 1   " $��
�� 
YELLr o   ! "���� 0 swatchcolor swatchColor\ =  * 1sts n   * -uvu 1   + -��
�� 
BLAKv o   * +���� 0 	fillcolor 	fillColort n   - 0wxw 1   . 0��
�� 
BLAKx o   - .���� 0 swatchcolor swatchColorZ r   6 9yzy m   6 7��
�� boovtruez o      ���� 0 isequal isEqual��  ��  X m    {{                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  V |��| L   ? A}} o   ? @���� 0 isequal isEqual��  I ~~ l     ��������  ��  ��   ��� l     ������  � !  Compares RGB color values.   � ��� 6   C o m p a r e s   R G B   c o l o r   v a l u e s .� ��� i    ��� I      �������  0 rgbcolorequals RGBColorEquals� ��� o      ���� 0 	fillcolor 	fillColor� ���� o      ���� 0 swatchcolor swatchColor��  ��  � k     5�� ��� r     ��� m     ��
�� boovfals� o      ���� 0 isequal isEqual� ��� O    2��� Z    1������� F    '��� F    ��� =   ��� n    ��� 1   	 ��
�� 
RED � o    	���� 0 	fillcolor 	fillColor� n    ��� 1    ��
�� 
RED � o    ���� 0 swatchcolor swatchColor� =   ��� n    ��� 1    ��
�� 
GREN� o    ���� 0 	fillcolor 	fillColor� n    ��� 1    ��
�� 
GREN� o    ���� 0 swatchcolor swatchColor� =   %��� n    !��� 1    !��
�� 
BLUE� o    ���� 0 	fillcolor 	fillColor� n   ! $��� 1   " $��
�� 
BLUE� o   ! "���� 0 swatchcolor swatchColor� r   * -��� m   * +��
�� boovtrue� o      ���� 0 isequal isEqual��  ��  � m    ��                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  � ���� L   3 5�� o   3 4���� 0 isequal isEqual��  � ��� l     ����~��  �  �~  � ��� l     �}���}  � "  Compares Gray color values.   � ��� 8   C o m p a r e s   G r a y   c o l o r   v a l u e s .� ��� i    ��� I      �|��{�| "0 graycolorequals GrayColorEquals� ��� o      �z�z 0 	fillcolor 	fillColor� ��y� o      �x�x 0 swatchcolor swatchColor�y  �{  � k     �� ��� r     ��� m     �w
�w boovfals� o      �v�v 0 isequal isEqual� ��� O    ��� Z    ���u�t� =   ��� n    ��� 1   	 �s
�s 
GRAY� o    	�r�r 0 	fillcolor 	fillColor� n    ��� 1    �q
�q 
GRAY� o    �p�p 0 swatchcolor swatchColor� r    ��� m    �o
�o boovtrue� o      �n�n 0 isequal isEqual�u  �t  � m    ��                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  � ��m� L    �� o    �l�l 0 isequal isEqual�m  � ��� l     �k�j�i�k  �j  �i  � ��� l     �h���h  �    Compares LAB color values   � ��� 4   C o m p a r e s   L A B   c o l o r   v a l u e s� ��� i    ��� I      �g��f�g  0 labcolorequals LabColorEquals� ��� o      �e�e 0 	fillcolor 	fillColor� ��d� o      �c�c 0 swatchcolor swatchColor�d  �f  � k     5�� ��� r     ��� m     �b
�b boovfals� o      �a�a 0 isequal isEqual� ��� O    2��� Z    1���`�_� F    '��� F    ��� =   ��� n    ��� 1   	 �^
�^ 
LabL� o    	�]�] 0 	fillcolor 	fillColor� n    ��� 1    �\
�\ 
LabL� o    �[�[ 0 swatchcolor swatchColor� =   ��� n    ��� 1    �Z
�Z 
LabA� o    �Y�Y 0 	fillcolor 	fillColor� n       1    �X
�X 
LabA o    �W�W 0 swatchcolor swatchColor� =   % n    ! 1    !�V
�V 
LabB o    �U�U 0 	fillcolor 	fillColor n   ! $ 1   " $�T
�T 
LabB o   ! "�S�S 0 swatchcolor swatchColor� r   * -	 m   * +�R
�R boovtrue	 o      �Q�Q 0 isequal isEqual�`  �_  � m    

                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  � �P L   3 5 o   3 4�O�O 0 isequal isEqual�P  �  l     �N�M�L�N  �M  �L    l     �K�K   "  Compares Spot color values.    � 8   C o m p a r e s   S p o t   c o l o r   v a l u e s . �J i     I      �I�H�I "0 spotcolorequals SpotColorEquals  o      �G�G 0 	fillcolor 	fillColor �F o      �E�E 0 swatchcolor swatchColor�F  �H   k     �  r      m     �D
�D boovfals o      �C�C 0 isequal isEqual  !  O    �"#" Z    �$%&�B$ =   '(' n    )*) 1    �A
�A 
pcls* n    +,+ 1    �@
�@ 
colr, n    -.- m   	 �?
�? 
caCC. o    	�>�> 0 swatchcolor swatchColor( m    �=
�= 
tCMi% r    %/0/ n   #121 I    #�<3�;�< "0 cmykcolorequals CMYKColorEquals3 454 n    676 1    �:
�: 
colr7 n    898 m    �9
�9 
caCC9 o    �8�8 0 	fillcolor 	fillColor5 :�7: n    ;<; 1    �6
�6 
colr< n    =>= m    �5
�5 
caCC> o    �4�4 0 swatchcolor swatchColor�7  �;  2  f    0 o      �3�3 0 isequal isEqual& ?@? =  ( 1ABA n   ( /CDC 1   - /�2
�2 
pclsD n   ( -EFE 1   + -�1
�1 
colrF n   ( +GHG m   ) +�0
�0 
caCCH o   ( )�/�/ 0 swatchcolor swatchColorB m   / 0�.
�. 
tRGi@ IJI r   4 EKLK n  4 CMNM I   5 C�-O�,�-  0 rgbcolorequals RGBColorEqualsO PQP n   5 :RSR 1   8 :�+
�+ 
colrS n   5 8TUT m   6 8�*
�* 
caCCU o   5 6�)�) 0 	fillcolor 	fillColorQ V�(V n   : ?WXW 1   = ?�'
�' 
colrX n   : =YZY m   ; =�&
�& 
caCCZ o   : ;�%�% 0 swatchcolor swatchColor�(  �,  N  f   4 5L o      �$�$ 0 isequal isEqualJ [\[ =  H Q]^] n   H O_`_ 1   M O�#
�# 
pcls` n   H Maba 1   K M�"
�" 
colrb n   H Kcdc m   I K�!
�! 
caCCd o   H I� �  0 swatchcolor swatchColor^ m   O P�
� 
tGRi\ efe r   T eghg n  T ciji I   U c�k�� "0 graycolorequals GrayColorEqualsk lml n   U Znon 1   X Z�
� 
colro n   U Xpqp m   V X�
� 
caCCq o   U V�� 0 	fillcolor 	fillColorm r�r n   Z _sts 1   ] _�
� 
colrt n   Z ]uvu m   [ ]�
� 
caCCv o   Z [�� 0 swatchcolor swatchColor�  �  j  f   T Uh o      �� 0 isequal isEqualf wxw =  h qyzy n   h o{|{ 1   m o�
� 
pcls| n   h m}~} 1   k m�
� 
colr~ n   h k� m   i k�
� 
caCC� o   h i�� 0 swatchcolor swatchColorz m   o p�
� 
tLabx ��� r   t ���� n  t ���� I   u �����  0 labcolorequals LabColorEquals� ��� n   u z��� 1   x z�
� 
colr� n   u x��� m   v x�
� 
caCC� o   u v�
�
 0 	fillcolor 	fillColor� ��	� n   z ��� 1   } �
� 
colr� n   z }��� m   { }�
� 
caCC� o   z {�� 0 swatchcolor swatchColor�	  �  �  f   t u� o      �� 0 isequal isEqual�  �B  # m    ��                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  ! ��� L   � ��� o   � ��� 0 isequal isEqual�  �J       ������������  � 	�� ��������������� 0 
checkpaths 
checkPaths�  *0 getswatchgroupindex getSwatchGroupIndex�� 0 colorequals ColorEquals�� "0 cmykcolorequals CMYKColorEquals��  0 rgbcolorequals RGBColorEquals�� "0 graycolorequals GrayColorEquals��  0 labcolorequals LabColorEquals�� "0 spotcolorequals SpotColorEquals
�� .aevtoappnull  �   � ****� �� x���������� 0 
checkpaths 
checkPaths�� ����� �  ���� 0 selecteditems selectedItems��  � �������������������������������� 0 selecteditems selectedItems�� 0 docref docRef�� 0 
swatchlist 
swatchList��  0 swatchgrpindex swatchGrpIndex��  0 swatchgroupref swatchGroupRef�� 0 i  �� 0 pathref pathRef�� 0 	grouppath 	groupPath�� 0 j  �� 0 currentswatch currentSwatch�� 0 swatchcolor swatchColor�� 0 	fillcolor 	fillColor�� 0 swatchexists swatchExists�� 0 	newswatch 	newSwatch�� 0 foundswatches foundSwatches� c������������������������������ ���������������RU����
�� 
docu
�� 
caSW�� *0 getswatchgroupindex getSwatchGroupIndex
�� 
cSGr
�� .corecnte****       ****
�� 
cobj
�� 
pcls
�� 
caGP
�� 
caPA�� 0 
checkpaths 
checkPaths
�� 
aiFC
�� 
tGDi
�� 
tPTi
�� 
bool
�� 
aiFP
�� .sysodisAaleR        TEXT
�� 
colr�� 0 colorequals ColorEquals
�� 
kSWt
�� .AiClkAShnull���    cSGr
�� 
kocl
�� .corecrel****      � null
�� .AiClkGAscaSW  @    cSGr
�� .coredelonull���    obj ��'�#*�k/E�O��-E�O)�k+ E�O��/E�O �k�j kh ��/E�O��,�  ��-E�O)�k+ 
Y ���,�  ���,�,�	 ��,�,��& ���,f  a j Y x Jk��-j kh ��/E�O�a ,E�O��,E�OfE�O)��l+  eE�O�a �l OY h[OY��O� &*a ��,l E�O��,�a ,FO�a �l Y hY 	a j Y 	a j [OY�"O�j E�O�jv  
�j Y hU� ��s���������� *0 getswatchgroupindex getSwatchGroupIndex�� ����� �  ���� 0 docref docRef��  � �������������� 0 docref docRef�� $0 swatchgroupfound swatchGroupFound�� 0 i  �� $0 currentswatchgrp currentSwatchGrp�� $0 swatchgroupindex swatchGroupIndex��  0 newswatchgroup newSwatchGroup� ������������������������
�� 
cSGr
�� .corecnte****       ****
�� 
pnam
�� 
bool
�� 
pidx
�� 
kocl
�� 
insh
�� 
prdt�� 
�� .corecrel****      � null�� k� dfE�O <k��-j kh ��/E�O��,	 	��,�& ��,E�OeE�OY h[OY��O� *���6���l� E�O��,E�Y hUO�� ������������� 0 colorequals ColorEquals�� ����� �  ������ 0 	fillcolor 	fillColor�� 0 swatchcolor swatchColor��  � ���������� 0 	fillcolor 	fillColor�� 0 swatchcolor swatchColor�� 0 isequal isEqual�� 0 swatchclass swatchClass� >����������������������
�� 
pcls
�� 
tCMi�� "0 cmykcolorequals CMYKColorEquals
�� 
tRGi��  0 rgbcolorequals RGBColorEquals
�� 
tGRi�� "0 graycolorequals GrayColorEquals
�� 
tLab��  0 labcolorequals LabColorEquals
�� 
tCSi�� "0 spotcolorequals SpotColorEquals�� zfE�O� o��,E�O���,  `��  )��l+ E�Y K��  )��l+ E�Y 9��  )��l+ E�Y '��  )��l+ 	E�Y ��  )��l+ E�Y hY hUO�� ��K���������� "0 cmykcolorequals CMYKColorEquals�� ����� �  ������ 0 	fillcolor 	fillColor�� 0 swatchcolor swatchColor��  � �������� 0 	fillcolor 	fillColor�� 0 swatchcolor swatchColor�� 0 isequal isEqual� {����������
�� 
CYAN
�� 
MAGN
�� 
bool
�� 
YELL
�� 
BLAK�� BfE�O� 7��,��, 	 ��,��, �&	 ��,��, �&	 ��,��, �& eE�Y hUO�� �������������  0 rgbcolorequals RGBColorEquals�� ����� �  ������ 0 	fillcolor 	fillColor�� 0 swatchcolor swatchColor��  � �������� 0 	fillcolor 	fillColor�� 0 swatchcolor swatchColor�� 0 isequal isEqual� ���������
�� 
RED 
�� 
GREN
�� 
bool
�� 
BLUE�� 6fE�O� +��,��, 	 ��,��, �&	 ��,��, �& eE�Y hUO�� ������������ "0 graycolorequals GrayColorEquals�� �~��~ �  �}�|�} 0 	fillcolor 	fillColor�| 0 swatchcolor swatchColor��  � �{�z�y�{ 0 	fillcolor 	fillColor�z 0 swatchcolor swatchColor�y 0 isequal isEqual� ��x
�x 
GRAY� fE�O� ��,��,  eE�Y hUO�� �w��v�u���t�w  0 labcolorequals LabColorEquals�v �s��s �  �r�q�r 0 	fillcolor 	fillColor�q 0 swatchcolor swatchColor�u  � �p�o�n�p 0 	fillcolor 	fillColor�o 0 swatchcolor swatchColor�n 0 isequal isEqual� 
�m�l�k�j
�m 
LabL
�l 
LabA
�k 
bool
�j 
LabB�t 6fE�O� +��,��, 	 ��,��, �&	 ��,��, �& eE�Y hUO�� �i�h�g���f�i "0 spotcolorequals SpotColorEquals�h �e��e �  �d�c�d 0 	fillcolor 	fillColor�c 0 swatchcolor swatchColor�g  � �b�a�`�b 0 	fillcolor 	fillColor�a 0 swatchcolor swatchColor�` 0 isequal isEqual� ��_�^�]�\�[�Z�Y�X�W�V�U
�_ 
caCC
�^ 
colr
�] 
pcls
�\ 
tCMi�[ "0 cmykcolorequals CMYKColorEquals
�Z 
tRGi�Y  0 rgbcolorequals RGBColorEquals
�X 
tGRi�W "0 graycolorequals GrayColorEquals
�V 
tLab�U  0 labcolorequals LabColorEquals�f �fE�O� ���,�,�,�  )��,�,��,�,l+ E�Y c��,�,�,�  )��,�,��,�,l+ E�Y C��,�,�,�  )��,�,��,�,l+ 	E�Y #��,�,�,�  )��,�,��,�,l+ E�Y hUO�� �T��S�R���Q
�T .aevtoappnull  �   � ****� k     ?��  3�P�P  �S  �R  �  �  m�O�N�M�L�K�J�I h�H k
�O .miscactvnull��� ��� null
�N 
docu
�M .corecnte****       ****
�L 
aiAD
�K 
sele�J 	0 paths  �I 0 
checkpaths 
checkPaths
�H .sysodisAaleR        TEXT�Q @� <*j O*�-j j %*�,�,E�O�j j )�k+ Y �j 	Y �j 	Uascr  ��ޭ